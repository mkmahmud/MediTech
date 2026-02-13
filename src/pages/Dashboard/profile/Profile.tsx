import {
    Mail, Phone, Calendar, ShieldCheck, Fingerprint, Activity,
    Camera, Clock,   ShieldAlert,
    Stethoscope, Award, DollarSign, Briefcase,
    Droplets, Ruler, Weight, PhoneCall, HeartPulse,
    User as UserIcon, Info, History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { userService } from "@/lib/services/userService";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user/useUserStore";
import { ImageUpload } from "@/components/shared/ImageUpload/ImageUpload";
import { toast } from "sonner";

// Static Tactical Data representing the full Prisma Model
const DUMMY_USER = {
    id: "USR-0882-AX-9",
    email: "a.dimitrov@clinical-os.net",
    username: "anton_dev_01",
    role: "SUPER_ADMIN", // Switch to "PATIENT" to see patient fields
    status: "ACTIVE",
    firstName: "Anton",
    lastName: "Dimitrov",
    phoneNumber: "+44 20 7946 0958",
    dateOfBirth: "1988-11-24",
    gender: "MALE",
    profileImageUrl: "/doctor.jpg",
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: true,
    createdAt: "2024-01-15T08:00:00Z",
    lastLogin: "2026-02-12T14:30:00Z",

    // Full Doctor Model Fields
    doctor: {
        licenseNumber: "LIC-99203341",
        specialization: "NEUROSURGERY",
        qualifications: ["MD", "PHD", "FACS"],
        experience: 12,
        consultationFee: 250.00,
        updatedAt: "2026-01-10T10:00:00Z"
    },

    // Full Patient Model Fields
    patient: {
        bloodType: "O+",
        height: 182.5,
        weight: 78.2,
        emergencyContactName: "MARIA DIMITROV",
        emergencyContactPhone: "+44 20 7946 0112",
        updatedAt: "2026-02-01T12:00:00Z"
    }
};

export default function ProfilePage() {
    const clinicalFontStack = { fontFamily: "'Roboto', sans-serif" };


    // States
    const { user, setUser } = useUserStore();
    const [isImageUpload, setImageUpload] = useState(false);

    useEffect(() => {
        const syncData = async () => {
            try {
                // 2. Call your service (Axios logic)
                const freshUserData = await userService.getProfile();
                // 3. Update your Zustand store (State logic)
                setUser(freshUserData);
            } catch (error) {
                console.error("CRITICAL_SYNC_FAILURE", error);
            }
        };

        syncData();
    }, [setUser]);

    const handleReportsUploaded = async (urls: string[]) => {

        try {

            const updateUserProfileImage = await userService.updateProfile({ profileImageUrl: urls[0] })
            setUser(updateUserProfileImage);
            setImageUpload(false)
            toast.success("Profile Image Updated Successfully!")
        } catch (error) {
            console.error("Faile to Update", error);
        }


    };

    return (
        <div style={clinicalFontStack} className="space-y-10 font-['Roboto']">
            {/* Header / Identity Band */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        {
                            isImageUpload ? <div  >

                                <ImageUpload
                                    label="Profile Picture"
                                    folder="radiology"
                                    onComplete={handleReportsUploaded}
                                />
                                <div className="w-full flex justify-center mt-4">
                                    <Button onClick={() => setImageUpload(false)} >
                                        Cancel
                                    </Button>
                                </div>
                            </div> : <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-[32px] flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 overflow-hidden relative">
                                <img src={user?.profileImageUrl || '/doctor.jpg'} alt="Profile" className="w-full h-full object-top" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" >


                                    <Camera className="w-6 h-6 text-white" onClick={() => setImageUpload(true)} />


                                </div>
                            </div>
                        }



                    </div>


                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-4xl font-black   ">
                                {user?.firstName} {user?.lastName}
                            </h1>
                            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-500">
                                {user?.status}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400  ">Internal_UID: {DUMMY_USER.id}</p>
                    </div>
                </div>

            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">

                    {/* SECTION 1: SYSTEM IDENTITY (USER MODEL) */}
                    <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-[11px] font-black mb-8 flex items-center gap-2 uppercase tracking-widest">
                            <Fingerprint className="w-4 h-4 text-orange" /> Core_User_Registry
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <ProfileItem label="Username" value={user?.username || "NOT_SET"} icon={UserIcon} />
                            <ProfileItem label="Email_Uplink" value={user?.email} icon={Mail} verified={user?.emailVerified} />
                            <ProfileItem label="Phone_Comms" value={user?.phoneNumber || "PENDING"} icon={Phone} verified={user?.phoneNumber} />
                            <ProfileItem label="Gender_Class" value={user?.gender || "UNSPECIFIED"} icon={Activity} />
                            <ProfileItem label="Date_of_Birth" value={user?.dateOfBirth || "Not Set Yet"} icon={Calendar} />
                            <ProfileItem label="Verification_Status" value={user?.emailVerified ? "VALIDATED" : "UNVERIFIED"} icon={ShieldCheck} />
                        </div>
                    </section>

                    {/* SECTION 2: PROFESSIONAL_DATA (DOCTOR MODEL) */}
                    {user?.role === "DOCTOR" && (
                        <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-orange">
                                <Stethoscope className="w-4 h-4" /> Professional_Credentials_Node
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <ProfileItem label="License_Number" value={user?.doctor?.licenseNumber} icon={ShieldAlert} />
                                <ProfileItem label="Specialization" value={user?.doctor?.specialization} icon={Briefcase} />
                                <ProfileItem label="Experience_Years" value={`${user?.doctor?.experience} YRS`} icon={History} />
                                <ProfileItem label="Qualifications" value={user?.doctor?.qualifications.join(" | ")} icon={Award} />
                                <ProfileItem label="Consultation_Rate" value={`$${user?.doctor?.consultationFee.toFixed(2)}`} icon={DollarSign} />

                            </div>
                        </section>
                    )}

                    {/* SECTION 2: CLINICAL_BIOMETRICS (PATIENT MODEL) */}
                    {user?.role === "PATIENT" && (
                        <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-orange">
                                <HeartPulse className="w-4 h-4" /> Biometric_Encryption_Layer
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <ProfileItem label="Blood_Group" value={user?.patient?.bloodType} icon={Droplets} />
                                <ProfileItem label="Stature_Height" value={`${user?.patient?.height} CM`} icon={Ruler} />
                                <ProfileItem label="Mass_Weight" value={`${user?.patient?.weight} KG`} icon={Weight} />

                                <div className="md:col-span-2 pt-4 border-t border-gray-50 dark:border-white/5 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <ProfileItem label="Emergency_Contact" value={user?.patient?.emergencyContactName} icon={UserIcon} />
                                        <ProfileItem label="Emergency_Uplink" value={user?.patient?.emergencyContactPhone} icon={PhoneCall} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECTION 3: SYSTEM_SECURITY (USER MODEL) */}
                    <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-orange" /> Security_Protocols
                        </h3>
                        <div className="space-y-4">
                            <SecurityToggle title="Two_Factor_Auth" desc="Enabled via biometric/token uplink" active={DUMMY_USER.twoFactorEnabled} />
                            <SecurityToggle title="HIPAA_Encryption" desc="End-to-end clinical data shrouding" active={true} />
                            <SecurityToggle title="Audit_Logging" desc="Real-time recording of node activity" active={true} />
                        </div>
                    </section>
                </div>

                {/* SIDEBAR: SYSTEM_METADATA */}
                <div className="space-y-8">
                    <div className="bg-black text-white dark:bg-white dark:text-black rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-orange/20 blur-[60px] rounded-full" />
                        <h4 className="text-[10px] text-center font-black uppercase tracking-[0.4em] mb-8 relative z-10">Access_Metadata</h4>
                        <div className="space-y-6 relative z-10">
                            <MetaRow label="Protocol_Role" value={user?.role} highlight />
                            <MetaRow label="Auth_Status" value={user?.status} />
                            <MetaRow label="Joined" value="JAN_2024" />
                            <MetaRow label="Last_Ping" value="14:30_GMT" />
                            <div className="pt-4 border-t border-white/10 dark:border-black/10">
                                <div className="flex justify-center items-center gap-2 text-orange">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-[9px] font-black uppercase tracking-widest tracking-widest">Uplink: 02h 45m</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC SYSTEM INFO BASED ON ROLE */}
                    <div className="p-8 border border-gray-100 dark:border-white/5 rounded-[32px] bg-gray-50/50 dark:bg-transparent flex flex-col items-center text-center">
                        <Info className="w-8 h-8 text-orange mb-4 opacity-50" />
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2">System_Intelligence</p>
                        <p className="text-[9px] font-medium text-gray-400 leading-relaxed uppercase tracking-wide">
                            {DUMMY_USER.role === "DOCTOR"
                                ? "Professional credentials are cross-referenced with the National Medical Registry."
                                : "Medical history and biometrics are encrypted at the application layer."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}



function ProfileItem({ label, value, icon: Icon, verified }: any) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Icon className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-black   text-gray-400">{label}</span>
            </div>
            <div className="flex items-center gap-3">
                <p className="text-sm font-bold  ">{value}</p>
                {verified && <ShieldCheck className="w-3 h-3 text-green-500" />}
            </div>
        </div>
    );
}

function SecurityToggle({ title, desc, active }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="pr-4">
                <p className="text-[10px] font-black uppercase tracking-widest">{title}</p>
                <p className="text-[9px] font-medium text-gray-400 uppercase mt-1 leading-relaxed">{desc}</p>
            </div>
            <div className={`shrink-0 w-10 h-5 rounded-full p-1 transition-colors ${active ? 'bg-orange' : 'bg-gray-200 dark:bg-white/10'}`}>
                <div className={`w-3 h-3 bg-white rounded-full transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
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