import { useParams } from "react-router";
import {
  Calendar as CalendarIcon, Clock,
  Stethoscope, Video, UserRound,
  FileText,
  CalendarCheck,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form"
import { TextareaGroup } from "@/components/ui/text-area-group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doctorService } from "@/lib/services/doctorService";
import { DoctorAsideSkeleton } from "@/components/skeleton/appointments/DoctorAsideSkeleton";
import { NoDataFound } from "@/components/shared/NoDataFound";
import { useUserStore } from "@/stores/user/useUserStore";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { toast } from "sonner";

// Helper function to generate time slots between start and end time
const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: number = 30) => {
  const slots: string[] = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  let currentHour = startHour;
  let currentMin = startMin;

  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const period = currentHour >= 12 ? 'PM' : 'AM';
    const displayHour = currentHour > 12 ? currentHour - 12 : currentHour === 0 ? 12 : currentHour;
    const displayMin = currentMin.toString().padStart(2, '0');
    slots.push(`${displayHour}:${displayMin} ${period}`);

    currentMin += intervalMinutes;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }
  }

  return slots;
};

// Helper function to convert 12-hour format to 24-hour for sorting
const convertTo24Hour = (time12h: string): string => {
  const [time, period] = time12h.split(' ');
  const [hour, minute] = time.split(':');
  let hour24 = parseInt(hour);

  if (period === 'PM' && hour24 !== 12) {
    hour24 += 12;
  } else if (period === 'AM' && hour24 === 12) {
    hour24 = 0;
  }

  return `${hour24.toString().padStart(2, '0')}:${minute}`;
};

export default function BookAppointment() {

  // Doctor Id
  const { id } = useParams();

  //Get User Info
  const { user } = useUserStore();

  // Get Doctor Profile 
  const { data: doctorInformation, isLoading: isDoctorLoading } = useQuery({
    queryKey: ['doctors', id],
    queryFn: () => {

      //@ts-ignore
      return doctorService.getDoctorById(id);
    },
    staleTime: 1000 * 60 * 5,
  });

  // Get Doctor Availability (For Slots & Dates)
  const { data: doctorAvailability } = useQuery({
    queryKey: ['doctors', id, 'availability'],
    queryFn: () => {
      //@ts-ignore
      return doctorService.getAvailability(id);
    }
  });

  // States mapping to your DB Model
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<"TELEMEDICINE" | "IN_PERSON" | "FOLLOW_UP" | "EMERGENCY">("IN_PERSON");

  // Generate available dates based on doctor's availability
  const availableDates = useMemo(() => {
    if (!doctorAvailability) return [];

    const dates = [];
    const today = new Date();

    for (let offset = 0; offset < 7; offset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + offset);

      // Day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday (same as JavaScript getDay())
      const dayOfWeek = date.getDay();

      // Check if doctor has any availability on this day (can have multiple slots)
      // @ts-ignore
      const availabilities = doctorAvailability.filter(
        (avail: any) => avail.dayOfWeek === dayOfWeek && avail.isAvailable
      );

      if (availabilities.length > 0) {
        dates.push({
          date,
          availabilities
        });
      }
    }

    return dates;
  }, [doctorAvailability]);

  // Generate time slots for selected date (can have multiple availability periods per day)
  const timeSlots = useMemo(() => {
    if (!selectedDate || !doctorAvailability) return [];

    const dayOfWeek = selectedDate.getDay();

    // Find all availability records for this day
    // @ts-ignore
    const availabilities = doctorAvailability.filter(
      (avail: any) => avail.dayOfWeek === dayOfWeek && avail.isAvailable
    );

    if (availabilities.length === 0) return [];

    // Generate slots for each availability period and merge them
    const allSlots: string[] = [];
    availabilities.forEach((avail: any) => {
      const slots = generateTimeSlots(avail.startTime, avail.endTime);
      allSlots.push(...slots);
    });

    // Sort slots chronologically
    return allSlots.sort((a, b) => {
      const timeA = convertTo24Hour(a);
      const timeB = convertTo24Hour(b);
      return timeA.localeCompare(timeB);
    });
  }, [selectedDate, doctorAvailability]);


  const methods = useForm<any>({
    defaultValues: {
      chiefComplaint: "",
    },
  })


  // Mutation to Create Appointment
  const queryClient = useQueryClient();

  const { mutate: createAppointment, isPending } = useMutation({
    mutationFn: (payload: any) => appointmentService.createAppointment(payload),
    onSuccess: ( ) => {
      toast.success("Appointment booked successfully");

      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-availability"] });

    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to book appointment";
      toast.error(message);
    },
  });

  // Handle Appointment Creation on Form Submit
  const onSubmit = async (data: any) => {

    // Convert Date into ISO String with selected time slot
    if (!selectedDate || !selectedSlot) return;

    const doctorId = doctorInformation?.doctor?.id || doctorInformation?.id;
    // @ts-ignore
    const patientId = user?.patient?.id;

    if (!doctorId || !patientId) {
      toast.error("Missing doctor or patient information. Please reload the page.");
      return;
    }

    const [timePart, meridiem] = selectedSlot.split(" ");
    const [hourString, minuteString] = timePart.split(":");

    let hour = parseInt(hourString, 10);
    const minute = parseInt(minuteString, 10);

    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;

    const scheduledAt = new Date(selectedDate);
    scheduledAt.setHours(hour, minute, 0, 0);

    const scheduledAtIso = scheduledAt.toISOString();

    const appointmentData = {
      doctorId,
      patientId,
      scheduledAt: scheduledAtIso,
      type: appointmentType,
      duration: 30,
      chiefComplaint: data.chiefComplaint,
    }
    try {
      createAppointment(appointmentData);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  }





  return (
    <section className="max-w-7xl mx-auto min-h-screen mt-20  p-6 lg:p-12 dark:text-white">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left: Doctor Summary Card */}

        {
          isDoctorLoading ? <DoctorAsideSkeleton /> : null
        }

        {
          doctorInformation &&

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-5 sticky top-32 shadow-sm">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-gray-100 dark:bg-white/5">
                <img src={doctorInformation?.profileImageUrl} alt="Doctor" className="w-full h-full object-cover" />
              </div>
              <div className="px-2">
                <h1 className="text-2xl font-black    mb-2">
                  Dr. {doctorInformation?.firstName} {doctorInformation?.lastName}
                </h1>
                <p className="text-sm font-medium text-orange    flex items-center gap-2">
                  <Stethoscope className="w-3 h-3" /> {doctorInformation?.doctor?.specialization}
                </p>
              </div>

              {/* DB Model Mapping: Duration & Type Summary */}
              <div className="mt-6 pt-6 border-t border-gray-50 dark:border-white/5 space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400  ">Consultation Fee </span>
                  <span className="text-lg font-black text-orange">${doctorInformation?.doctor?.consultationFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400  ">Type</span>
                  <span className="text-xs font-black text-orange">{appointmentType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400  ">Experience </span>
                  <span className="text-xs font-black text-orange">{doctorInformation?.doctor?.experience} Years</span>
                </div>
              </div>
            </div>
          </aside>
        }


        {/* Right: Booking Form */}
        <main className="lg:col-span-8 space-y-12">



          {
            // @ts-ignore
            doctorAvailability && doctorAvailability.length > 0 ?

              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">


                  <div className="space-y-3">
                    <h2 className="text-5xl font-black  ">Schedule <span className="text-orange">Consult</span></h2>
                    <p className="text-gray-500 text-sm font-medium">Complete the protocol to secure your medical appointment.</p>
                  </div>

                  {/* 1. Appointment Type (Maps to 'type' in DB) */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'TELEMEDICINE', label: 'Telemedicine', icon: Video },
                      { id: 'IN_PERSON', label: 'Clinic Visit', icon: UserRound },
                      { id: 'FOLLOW_UP', label: 'Follow-up', icon: CalendarCheck },
                      { id: 'EMERGENCY', label: 'Emergency', icon: AlertTriangle }
                    ].map((t) => (
                      <Button
                        variant="secondary"
                        key={t.id}
                        type="button"
                        onClick={() => setAppointmentType(t.id as any)}
                        className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all ${appointmentType === t.id
                          ? "border-orange bg-orange/5"
                          : "border-gray-100 dark:border-white/5 bg-white dark:bg-white/5"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <t.icon className={`w-5 h-5 ${appointmentType === t.id ? "text-orange" : "text-gray-400"}`} />
                          <span className={`text-sm font-black    ${appointmentType === t.id ? "text-orange" : "text-gray-500"}`}>
                            {t.label}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${appointmentType === t.id ? "border-orange" : "border-gray-300"}`}>
                          {appointmentType === t.id && <div className="w-2 h-2 bg-orange rounded-full" />}
                        </div>
                      </Button>
                    ))}
                  </div>

                  {/* 2. Date Selection (Maps to 'scheduledAt') */}
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-3 text-sm font-medium  ">
                      <CalendarIcon className="w-4 h-4 text-orange" /> Available Dates
                    </h3>
                    {availableDates.length === 0 ? (
                      <p className="text-sm text-gray-500">No available dates found. Please check back later.</p>
                    ) : (
                      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {availableDates.map(({ date }, index) => {
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          return (
                            <Button
                              key={index}
                              onClick={() => {
                                setSelectedDate(date);
                                setSelectedSlot(null); // Reset slot when date changes
                              }}
                              type="button"
                              className={`flex-shrink-0 w-24 py-10 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-2 ${isSelected
                                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                                : "bg-white dark:bg-white/5 border-transparent text-gray-400"
                                }`}
                            >
                              <span className="text-[10px] font-bold uppercase">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                              </span>
                              <span className="text-2xl font-black">{date.getDate()}</span>
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 3. Time Selection (Part of 'scheduledAt') */}
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-3 text-sm font-medium  ">
                      <Clock className="w-4 h-4 text-orange" /> Select Time Slot
                    </h3>
                    {!selectedDate ? (
                      <p className="text-sm text-gray-500">Please select a date first</p>
                    ) : timeSlots.length === 0 ? (
                      <p className="text-sm text-gray-500">No time slots available for this date</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-4 rounded-2xl border-2 font-medium   transition-all ${selectedSlot === slot
                              ? "bg-orange text-white border-orange"
                              : "bg-white dark:bg-white/5 border-transparent text-gray-600 dark:text-gray-300"
                              }`}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 4. Chief Complaint (Maps to 'chiefComplaint' in DB) */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-3 text-sm font-medium  ">
                      <FileText className="w-4 h-4 text-orange" /> Chief Complaint
                    </h3>
                    <TextareaGroup
                      placeholder="Describe your symptoms or reason for visit (e.g., persistent cough, annual checkup)..."
                      className="rounded-[1.5rem] bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 min-h-[120px] p-6 focus:ring-orange text-sm"

                      name="chiefComplaint"
                    />

                  </div>

                  {/* 5. Confirmation Action */}
                  <div className="pt-10 w-full flex justify-end">

                    <Button
                      disabled={!selectedDate || !selectedSlot || isPending}
                      className=" "
                      type="submit"
                    >
                      {isPending ? "Booking..." : "Confirm Appointment"}
                    </Button>
                  </div>

                </form>
              </FormProvider >
              : <NoDataFound title="Doctor Not Available" description="The selected doctor is not available for booking." />
          }
        </main>
      </div>
    </section>
  );
}