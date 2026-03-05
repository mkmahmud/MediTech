import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Star,
    Award,
    Clock,
    Calendar,
    Phone,
    Mail,
    CheckCircle2,
    ArrowLeft,
    GraduationCap,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";


// Static fallback data
const DOCTOR_DATA = {
    id: "1",
    email: "dr.sarah@example.com",
    firstName: "Sarah",
    lastName: "Johnson",
    phoneNumber: "+1 (555) 123-4567",
    profileImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    emailVerified: true,
    gender: "FEMALE",
    dateOfBirth: "1985-06-15",
    role: "DOCTOR",
    status: "ACTIVE",
    doctor: {
        id: "doc_1",
        licenseNumber: "MD-2024-001234",
        specialization: "CARDIOLOGY",
        qualifications: ["MD in Cardiology", "Board Certified", "Fellowship in Interventional Cardiology"],
        experience: 15,
        consultationFee: 150,
    },
    availability: [
        { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isAvailable: true },
        { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isAvailable: true },
        { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isAvailable: true },
        { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isAvailable: true },
        { dayOfWeek: 5, startTime: "09:00", endTime: "15:00", isAvailable: true },
    ]
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function DoctorProfile() {
    const navigate = useNavigate();
    const doctor = DOCTOR_DATA;

    const getRating = () => (Math.random() * (5 - 4.5) + 4.5).toFixed(1);

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#030303] text-[#1a1a1a] dark:text-white">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-[#fcfcfc]/80 dark:bg-[#030303]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
                    <Button
                        onClick={() => navigate('/doctors')}
                        className="flex items-center gap-2 bg-transparent border-2 border-gray-200 dark:border-white/10 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Directory
                    </Button>
                </div>
            </div>

            {/* Static Data Notice */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6">
                <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">Showing demo data. Actual data will load from your API.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-8">
                {/* Hero Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#080808] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12">
                        {/* Left: Avatar & Status */}
                        <div className="col-span-1 flex flex-col items-center lg:items-start">
                            <div className="relative mb-6">
                                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-orange/20">
                                    <img 
                                        src={doctor.profileImageUrl} 
                                        alt={`Dr. ${doctor.firstName}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#080808] rounded-full p-2 border-4 border-white dark:border-[#080808] shadow-lg">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-200 dark:border-green-900/50">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs font-bold text-green-700 dark:text-green-400">Available</span>
                                    </div>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="space-y-2 w-full">
                                <div className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Verified</span>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-orange/10 rounded-lg border border-orange/20">
                                    <Star className="w-4 h-4 fill-orange text-orange" />
                                    <span className="text-xs font-semibold text-orange">{getRating()} Rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Middle/Right: Profile Info */}
                        <div className="col-span-1 lg:col-span-2 space-y-6">
                            {/* Name & Title */}
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-2">
                                    Dr. {doctor.firstName} {doctor.lastName}
                                </h1>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-orange uppercase tracking-[0.3em] px-3 py-2 bg-orange/10 rounded-lg border border-orange/20">
                                        {doctor.doctor?.specialization || 'General Practice'}
                                    </span>
                                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg">
                                        License: {doctor.doctor?.licenseNumber}
                                    </span>
                                </div>
                            </div>

                            {/* Key Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Experience</p>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">{doctor.doctor?.experience}+</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Years</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Consultation</p>
                                    <p className="text-2xl font-black text-orange">${doctor.doctor?.consultationFee}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Per Session</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Patients</p>
                                    <p className="text-2xl font-black text-primary">500+</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Satisfied</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Rating</p>
                                    <p className="text-2xl font-black text-orange">{getRating()}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Out of 5</p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Phone</p>
                                        <p className="text-sm font-mono text-gray-900 dark:text-white">{doctor.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Email</p>
                                        <p className="text-sm font-mono text-gray-900 dark:text-white truncate">{doctor.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button 
                                    onClick={() => navigate(`/appointment`)}
                                    className="flex-1 h-14 rounded-xl bg-orange hover:bg-orange/90 text-white font-black uppercase tracking-wide"
                                >
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book Appointment
                                </Button>
                                <Button 
                                    className="flex-1 h-14 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-black dark:text-white font-black uppercase tracking-wide"
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Qualifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#080808] rounded-3xl border border-gray-100 dark:border-white/5 p-8 lg:p-12"
                >
                    <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-primary" />
                        Qualifications
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doctor.doctor?.qualifications.map((qualification: string, index: number) => (
                            <div 
                                key={index}
                                className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-950/10 rounded-lg border border-blue-200 dark:border-blue-900/30"
                            >
                                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                <p className="font-semibold text-gray-900 dark:text-white">{qualification}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Availability Schedule */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#080808] rounded-3xl border border-gray-100 dark:border-white/5 p-8 lg:p-12"
                >
                    <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3">
                        <Clock className="w-8 h-8 text-orange" />
                        Availability Schedule
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doctor.availability.map((availability: any, index: number) => (
                            availability.isAvailable && (
                                <div 
                                    key={index}
                                    className="p-4 bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 rounded-lg border border-green-200 dark:border-green-900/30"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-bold text-gray-900 dark:text-white">{DAY_NAMES[availability.dayOfWeek]}</p>
                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-semibold rounded">Available</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        {availability.startTime} - {availability.endTime}
                                    </p>
                                </div>
                            )
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
