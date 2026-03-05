
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Star,
    ArrowUpRight,
    Activity,
    Award,
    Clock,
    CheckCircle2,
    Phone,

} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DoctorCard({ doctor, i }: { doctor: any; i: number }) {
    const navigate = useNavigate();
    const getRating = () => (Math.random() * (5 - 4.5) + 4.5).toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white dark:bg-[#080808] rounded-2xl lg:rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden hover:border-orange/30 hover:shadow-xl transition-all flex flex-col lg:flex-row h-full lg:h-auto"
        >
            {/* Left: Image Section */}
            <div className="relative w-full lg:w-64 h-48 lg:h-80 flex-shrink-0 bg-gradient-to-br from-orange/10 to-primary/10">
                {doctor.profileImageUrl ? (
                    <div className="w-full h-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <img
                            src={doctor.profileImageUrl}
                            alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange/20 to-primary/20 flex items-center justify-center font-black text-5xl lg:text-6xl text-orange/40">
                        {doctor.firstName?.[0]}{doctor.lastName?.[0]}
                    </div>
                )}

                {/* Status Indicator */}
                <div className="absolute top-3 right-3 h-4 w-4 bg-green-500 rounded-full border-3 border-white dark:border-[#080808] shadow-lg">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-pulse" />
                </div>

                {/* Verified Badge */}
                {doctor.emailVerified && (
                    <div className="absolute bottom-3 right-3 bg-primary p-2 rounded-full border-3 border-white dark:border-[#080808] shadow-lg">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>

            {/* Right: Content Section */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col relative">
                {/* Top Right: Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2">
                    <Button
                        onClick={() => navigate(`/doctors/${doctor.id}`)}
                        variant="outline"
                        title="View Profile"
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </Button>
                    <Button

                        onClick={() => navigate(`/appointment/${doctor.id}`)}
                        className="cursor-pointer hidden md:block"
                        title="Book Appointment"
                    >
                        Book Now
                    </Button>
                </div>

                {/* Doctor Name & Title */}
                <div className="space-y-3 mb-4 pr-24">
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
                        Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-orange      px-3 py-1.5 bg-orange/10 rounded-full border border-orange/20">
                            {doctor.doctor?.specialization || 'General Practice'}
                        </span>
                    </div>
                </div>

                {/* Rating & Experience */}
                <div className="flex gap-3 mb-6">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                        <Star className="w-4 h-4 fill-orange text-orange flex-shrink-0" />
                        <span className="text-sm font-black text-gray-900 dark:text-white">{getRating()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{doctor.doctor?.experience || 0}Y Exp</span>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="space-y-3 mb-6">
                    {/* Qualifications */}
                    {doctor.doctor?.qualifications && doctor.doctor.qualifications.length > 0 && (
                        <div className="flex items-start gap-3">
                            <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Qualifications</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                    {doctor.doctor.qualifications.slice(0, 2).join(', ')}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Consultation Fee */}
                    {doctor.doctor?.consultationFee && (
                        <div className="flex items-start gap-3">
                            <Activity className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Consultation</p>
                                <p className="text-lg font-black text-gray-900 dark:text-white">
                                    ${doctor.doctor.consultationFee}
                                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">/ session</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Phone */}
                    {doctor.phoneNumber && (
                        <div className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">{doctor.phoneNumber}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom CTA Button - Mobile */}
                <div className="lg:hidden mt-auto pt-4">
                    <Button
                        onClick={() => navigate(`/appointment/${doctor.id}`)}
                        className="w-full  "
                    >
                        Book Appointment
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
