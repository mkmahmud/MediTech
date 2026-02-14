import {
    Mail, Phone, ShieldCheck, Fingerprint, Activity,
    Camera, Clock, ShieldAlert, Stethoscope, DollarSign,
    Briefcase,
    User as UserIcon, History, Edit3, Save, X as CloseIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { userService } from "@/lib/services/userService";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user/useUserStore";
import { ImageUpload } from "@/components/shared/ImageUpload/ImageUpload";
import { toast } from "sonner";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { SPECIALIZATIONS } from "@/types/doctors";

export default function ProfilePage() {
    const clinicalFontStack = { fontFamily: "'Roboto', sans-serif" };
    const { user, setUser } = useUserStore();
    const [isImageUpload, setImageUpload] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    //   Initialize Form with Nested Doctor Fields
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

    //   Sync Form with User Store
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

    useEffect(() => {
        const syncData = async () => {
            try {
                const freshUserData = await userService.getProfile();
                setUser(freshUserData);
            } catch (error) {
                console.error("CRITICAL_SYNC_FAILURE", error);
            }
        };
        syncData();
    }, [setUser]);

    //   Submit  
    const onSubmit = async (data: any) => {
        try {
            // Ensure numbers are sent as numbers, not strings from the input
            const payload = {
                ...data,
                doctor: data.doctor ? {
                    ...data.doctor,
                    experience: Number(data.doctor.experience),
                    consultationFee: Number(data.doctor.consultationFee)
                } : undefined
            };

            const updatedUser = await userService.updateProfile(payload);
            setUser(updatedUser);
            console.log(payload)
            setIsEditing(false);
            toast.success("BIOMETRIC_REGISTRY_UPDATED");
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("UPDATE_PROTOCOL_REJECTED");
        }
    };

    const handleImageUploaded = async (urls: string[]) => {
        try {
            const updated = await userService.updateProfile({ profileImageUrl: urls[0] });
            setUser(updated);
            setImageUpload(false);
            toast.success("VISUAL_ID_SYNCHRONIZED");
        } catch (error) {
            console.error("Failed to Update", error);
        }
    };

    return (
        <div style={clinicalFontStack} className="space-y-10 font-['Roboto']">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        {isImageUpload ? (
                            <div className="w-64 animate-in fade-in zoom-in-95">
                                <ImageUpload
                                    label="Profile Picture"
                                    folder="avatars"
                                    onComplete={handleImageUploaded}
                                />
                                <Button variant="ghost" size="sm" onClick={() => setImageUpload(false)} className="w-full mt-2 text-[9px] font-black uppercase">
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-[32px] flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 overflow-hidden relative">
                                <img src={user?.profileImageUrl || '/doctor.jpg'} alt="Profile" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <Camera className="w-6 h-6 text-white" onClick={() => setImageUpload(true)} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-4xl font-black  ">
                                {user?.firstName} {user?.lastName}
                            </h1>
                            <Button
                                onClick={() => setIsEditing(!isEditing)}
                                variant="outline"
                                className={`rounded-full px-4 h-8 text-[9px] font-black uppercase tracking-widest transition-all ${isEditing ? 'border-red-500 text-red-500 hover:bg-red-50' : 'border-orange text-orange hover:bg-orange/5'}`}
                            >
                                {isEditing ? <><CloseIcon className="w-3 h-3 mr-2" /> Discard</> : <><Edit3 className="w-3 h-3 mr-2" /> Edit</>}
                            </Button>
                        </div>
                        <p className="text-[10px] font-black text-gray-400">User: {user?.id || "NULL_ID"}</p>
                    </div>
                </div>
            </header>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-8">

                        {/* REGISTRY SECTION */}
                        <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-[11px] font-black flex items-center gap-2 text-gray-500">
                                    <Fingerprint className="w-4 h-4 text-orange" /> Personal Information
                                </h3>
                                {isEditing && (
                                    <Button type="submit" className="bg-orange hover:bg-orange/90 text-white text-[10px] font-black uppercase px-6 rounded-xl h-9 shadow-lg shadow-orange/20">
                                        <Save className="w-4 h-4 mr-2" /> Commit_Changes
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                                <ProfileItem label="Username" value={user?.username} icon={UserIcon} isEditing={isEditing} name="username" />
                                <ProfileItem label="Email_Uplink" value={user?.email} icon={Mail} verified={user?.emailVerified} isEditing={false} />
                                <ProfileItem label="First_Name" value={user?.firstName} icon={Fingerprint} isEditing={isEditing} name="firstName" />
                                <ProfileItem label="Last_Name" value={user?.lastName} icon={Fingerprint} isEditing={isEditing} name="lastName" />
                                <ProfileItem label="Phone_Comms" value={user?.phoneNumber || "PENDING"} icon={Phone} isEditing={isEditing} name="phoneNumber" />
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
                                />                                {/* <ProfileItem label="Date_of_Birth" value={user?.dateOfBirth} icon={Calendar} isEditing={isEditing} name="dateOfBirth" type="date" /> */}
                                <ProfileItem label="Registry_Status" value={user?.status} icon={ShieldCheck} isEditing={false} />
                            </div>
                        </section>

                        {/* DOCTOR VIEW - NOW EDITABLE */}
                        {user?.role === "DOCTOR" && (
                            <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-orange">
                                    <Stethoscope className="w-4 h-4" /> Professional information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                                    <ProfileItem label="License_Number" value={user?.doctor?.licenseNumber} icon={ShieldAlert} isEditing={isEditing} name="doctor.licenseNumber" />

                                    <ProfileItem
                                        label="Specialization"
                                        value={user?.doctor?.specialization}
                                        icon={Briefcase}
                                        isEditing={isEditing}
                                        name="doctor.specialization"
                                        type="select"
                                        options={SPECIALIZATIONS?.map(spec => ({
                                            label: spec.split('_').map(word =>
                                                word.charAt(0) + word.slice(1).toLowerCase()
                                            ).join(' '),
                                            value: spec
                                        }))}
                                    />
                                    <ProfileItem label="Experience_Years" value={`${user?.doctor?.experience} YRS`} icon={History} isEditing={isEditing} name="doctor.experience" type="number" />
                                    <ProfileItem label="Consultation_Rate ($)" value={user?.doctor?.consultationFee?.toFixed(2)} icon={DollarSign} isEditing={isEditing} name="doctor.consultationFee" type="number" />
                                </div>
                            </section>
                        )}
                    </div>

                    {/* METADATA SIDEBAR */}
                    <aside className="space-y-8">
                        <div className="bg-black text-white dark:bg-white dark:text-black rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-orange/20 blur-[60px] rounded-full" />
                            <h4 className="text-[10px] text-center font-black uppercase tracking-[0.4em] mb-8 relative z-10">Access_Metadata</h4>
                            <div className="space-y-6 relative z-10">
                                <MetaRow label="Protocol_Role" value={user?.role} highlight />
                                <MetaRow label="Auth_Status" value={user?.status} />
                                <MetaRow label="Sync_State" value={isEditing ? "MOD_ACTIVE" : "ENCRYPTED"} />
                                <div className="pt-6 border-t border-white/10 dark:border-black/10">
                                    <div className="flex justify-center items-center gap-2 text-orange animate-pulse">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Live_Uplink_Established</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </form>
            </FormProvider>
        </div>
    );
}

function ProfileItem({ label, value, icon: Icon, verified, isEditing, name, type = "text", options = [] }: any) {
    const { register } = useFormContext();

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Icon className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter opacity-70">{label}</span>
            </div>
            <div className="flex items-center gap-3">
                {isEditing && name ? (
                    type === "select" ? (
                        <select
                            {...register(name)}
                            className="bg-gray-100 dark:bg-white/10 border-none rounded-xl px-4 py-2 text-sm font-bold w-full focus:ring-2 focus:ring-orange/50 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="dark:bg-[#080808]">Select {label}</option>
                            {options.map((opt: any) => (
                                <option key={opt.value} value={opt.value} className="dark:bg-[#080808]">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            {...register(name)}
                            type={type}
                            step={type === "number" ? "any" : undefined}
                            className="bg-gray-100 dark:bg-white/10 border-none rounded-xl px-4 py-2 text-sm font-bold w-full focus:ring-2 focus:ring-orange/50 outline-none transition-all placeholder:text-gray-500 text-gray-900 dark:text-white"
                        />
                    )
                ) : (
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{value || "---"}</p>
                        {verified && <ShieldCheck className="w-3.5 h-3.5 text-green-500" />}
                    </div>
                )}
            </div>
        </div>
    );
}

function MetaRow({ label, value, highlight }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-[9px] font-black uppercase opacity-50 tracking-widest">{label}</span>
            <span className={`text-[11px] font-bold uppercase ${highlight ? 'text-orange' : ''}`}>{value}</span>
        </div>
    );
}