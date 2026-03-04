import {
  Mail, Phone, ShieldCheck, Fingerprint, Activity,
  Stethoscope, DollarSign, Briefcase, History, UserIcon
} from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserStore } from "@/stores/user/useUserStore";
import { userService } from "@/lib/services/userService";
import { SPECIALIZATIONS } from "@/types/doctors";
import type { ProfileUser } from "../../profileTypes";
import { ProfileHeader } from "../shared/ProfileHeader";
import { ProfileFormSection } from "../shared/ProfileFormSection";
import { ProfileItem } from "../shared/ProfileItem";
import { MetaRow } from "../shared/MetaRow";
import { useEffect, useState } from "react";

interface DoctorProfileProps {
  user: ProfileUser | null;
  refetch: () => void;
}

export function DoctorProfile({ user, refetch }: DoctorProfileProps) {
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      doctor: {
        licenseNumber: "",
        specialization: "",
        experience: 0,
        consultationFee: 0
      }
    }
  });

  useEffect(() => {
    if (user) {
      methods.reset({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        gender: user.gender || "",
        doctor: {
          licenseNumber: user.doctor?.licenseNumber || "",
          specialization: user.doctor?.specialization || "",
          experience: user.doctor?.experience || 0,
          consultationFee: user.doctor?.consultationFee || 0
        }
      });
    }
  }, [user, methods]);

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        doctor: {
          licenseNumber: data.doctor.licenseNumber,
          specialization: data.doctor.specialization,
          experience: Number(data.doctor.experience),
          consultationFee: Number(data.doctor.consultationFee),
          qualifications: user?.doctor?.qualifications || []
        }
      };
      return userService.updateProfile(payload as any);
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      setIsEditing(false);
      queryClient.setQueryData(['userProfile'], updatedUser);
      setTimeout(() => {
        refetch();
      }, 300);
      toast.success("BIOMETRIC_REGISTRY_UPDATED");
    },
    onError: (error: any) => {
      console.error("Update Error:", error);
      toast.error("UPDATE_PROTOCOL_REJECTED");
    }
  });

  const { mutate: updateProfileImage, isPending: isUploadingImage } = useMutation({
    mutationFn: async (imageUrl: string) => {
      return userService.updateProfile({ profileImageUrl: imageUrl });
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(['userProfile'], updatedUser);
      setTimeout(() => {
        refetch();
      }, 300);
      toast.success("VISUAL_ID_SYNCHRONIZED");
    },
    onError: (error: any) => {
      console.error("Failed to Update", error);
      toast.error("IMAGE_UPDATE_FAILED");
    }
  });

  const onSubmit = (data: any) => {
    updateProfile(data);
  };

  const handleImageUploaded = (urls: string[]) => {
    updateProfileImage(urls[0]);
  };

  return (
    <div className="space-y-10 font-['Roboto'] pb-20">
      <ProfileHeader
        user={user}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        onImageUpload={handleImageUploaded}
        isUploadingImage={isUploadingImage}
        isSaving={isUpdating}
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {/* PERSONAL INFORMATION */}
            <ProfileFormSection
              title="Personal Information"
              description="Basic profile details"
              icon={Fingerprint}
              iconColor="bg-orange/10"
              gradientColor="bg-orange/5"
              showSaveButton={isEditing}
              isSaving={isUpdating}
              onSave={() => methods.handleSubmit(onSubmit)()}
            >
              <ProfileItem
                label="Username"
                value={user?.username}
                icon={UserIcon}
                isEditing={isEditing}
                name="username"
              />
              <ProfileItem
                label="Email_Uplink"
                value={user?.email}
                icon={Mail}
                verified={user?.emailVerified}
                isEditing={false}
              />
              <ProfileItem
                label="First_Name"
                value={user?.firstName}
                icon={Fingerprint}
                isEditing={isEditing}
                name="firstName"
              />
              <ProfileItem
                label="Last_Name"
                value={user?.lastName}
                icon={Fingerprint}
                isEditing={isEditing}
                name="lastName"
              />
              <ProfileItem
                label="Phone_Comms"
                value={user?.phoneNumber || "PENDING"}
                icon={Phone}
                isEditing={isEditing}
                name="phoneNumber"
              />
              <ProfileItem
                label="Gender_Class"
                value={user?.gender || "UNSPECIFIED"}
                icon={Activity}
                isEditing={isEditing}
                name="gender"
                type="select"
                options={[
                  { label: "MALE", value: "MALE" },
                  { label: "FEMALE", value: "FEMALE" },
                  { label: "PREFER_NOT_TO_SAY", value: "PREFER_NOT_TO_SAY" },
                  { label: "OTHER", value: "OTHER" }
                ]}
              />
              <ProfileItem
                label="Registry_Status"
                value={user?.status}
                icon={ShieldCheck}
                isEditing={false}
              />
            </ProfileFormSection>

            {/* PROFESSIONAL INFORMATION */}
            <ProfileFormSection
              title="Professional Information"
              description="Medical credentials and expertise"
              icon={Stethoscope}
              iconColor="bg-blue/10"
              gradientColor="bg-blue/5"
              showSaveButton={isEditing}
              isSaving={isUpdating}
              onSave={() => methods.handleSubmit(onSubmit)()}
            >
              <ProfileItem
                label="License_Number"
                value={user?.doctor?.licenseNumber}
                icon={ShieldCheck}
                isEditing={isEditing}
                name="doctor.licenseNumber"
              />
              <ProfileItem
                label="Specialization"
                value={user?.doctor?.specialization}
                icon={Briefcase}
                isEditing={isEditing}
                name="doctor.specialization"
                type="select"
                options={SPECIALIZATIONS?.map((spec) => ({
                  label: spec
                    .split('_')
                    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                    .join(' '),
                  value: spec
                }))}
              />
              <ProfileItem
                label="Experience_Years"
                value={`${user?.doctor?.experience} YRS`}
                icon={History}
                isEditing={isEditing}
                name="doctor.experience"
                type="number"
              />
              <ProfileItem
                label="Consultation_Rate ($)"
                value={user?.doctor?.consultationFee?.toFixed(2)}
                icon={DollarSign}
                isEditing={isEditing}
                name="doctor.consultationFee"
                type="number"
              />
            </ProfileFormSection>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8">
            {/* SYSTEM STATUS */}
            <div className="bg-gradient-to-br from-black to-black/90 dark:from-white dark:to-white/90 text-white dark:text-black rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10 dark:border-black/10">
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-orange/20 blur-[60px] rounded-full" />
              <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-blue/20 blur-[60px] rounded-full" />
              <h4 className="text-[10px] text-center font-black uppercase tracking-[0.4em] mb-8 relative z-10 bg-gradient-to-r from-orange via-orange/70 to-orange/50 bg-clip-text text-transparent dark:from-black dark:via-black dark:to-black">
                System Status
              </h4>
              <div className="space-y-6 relative z-10">
                <MetaRow label="Account Role" value={user?.role} highlight darkMode={true} />
                <MetaRow label="Auth Status" value={user?.status} darkMode={true} />
                <MetaRow label="Profile Mode" value={isEditing ? "EDITING" : "VIEWING"} highlight={isEditing} darkMode={true} />
                <div className="pt-6 border-t border-white/20 dark:border-black/20">
                  <div className="flex justify-center items-center gap-2 text-orange animate-pulse">
                    <div className="w-2 h-2 bg-orange rounded-full" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL STATS */}
            {user?.doctor && (
              <div className="bg-gradient-to-br from-blue/10 to-blue/5 dark:from-blue/20 dark:to-blue/10 border border-blue/20 dark:border-blue/30 rounded-3xl p-6 space-y-4">
                <h4 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  Professional Stats
                </h4>
                <div className="space-y-3 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 font-bold">Experience</span>
                    <span className="font-black text-blue-600 dark:text-blue-400">
                      {user.doctor.experience} Years
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 font-bold">Consultation Fee</span>
                    <span className="font-black text-blue-600 dark:text-blue-400">
                      ${user.doctor.consultationFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 font-bold">Specialization</span>
                    <span className="font-black text-blue-600 dark:text-blue-400 capitalize">
                      {user.doctor.specialization?.split('_').join(' ').toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </form>
      </FormProvider>
    </div>
  );
}
