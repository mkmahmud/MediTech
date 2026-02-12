import {
      Mail, Phone, Calendar,
    ShieldCheck, Fingerprint, Activity,
    Camera, Clock, AlertTriangle, Key, ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Static Tactical Data for UI Rendering
const DUMMY_USER = {
    id: "USR-0882-AX-9",
    email: "a.dimitrov@clinical-os.net",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    firstName: "Anton",
    lastName: "Dimitrov",
    phoneNumber: "+44 20 7946 0958",
    dateOfBirth: "1988-11-24",
    gender: "MALE",
    profileImageUrl: null,
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: true,
    createdAt: "2024-01-15T08:00:00Z",
    lastLogin: "2026-02-12T14:30:00Z"
};

export default function ProfilePage() {
    const clinicalFontStack = { fontFamily: "'Roboto', sans-serif" };

    return (
        <div style={clinicalFontStack} className="space-y-10 font-['Roboto']">
            {/* Header / Identity Band */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-[32px] flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 overflow-hidden relative">
                            {DUMMY_USER.profileImageUrl ? (
                                <img src="/doctor.jpg" alt="Profile" className="w-full h-full object-top" />
                            ) : (
                                <img src="/doctor.jpg" alt="Profile" className="w-full h-full object-top" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-4xl font-black uppercase   ">
                                {DUMMY_USER.firstName}_{DUMMY_USER.lastName}
                            </h1>
                            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-500">
                                {DUMMY_USER.status}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Node_ID: {DUMMY_USER.id}</p>
                    </div>
                </div>
                <Button className="bg-orange hover:bg-orange/90 text-white px-8 py-6 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-orange/20 transition-all">
                    <Key className="w-4 h-4 mr-2" /> Reset_Access_Keys
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Profile Data Matrix */}
                <div className="xl:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-[11px] font-black    mb-8 flex items-center gap-2">
                            <Fingerprint className="w-4 h-4 text-orange" /> Personal Identity
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <ProfileItem label="Email" value={DUMMY_USER.email} icon={Mail} verified={DUMMY_USER.emailVerified} />
                            <ProfileItem label="Phone" value={DUMMY_USER.phoneNumber} icon={Phone} verified={DUMMY_USER.phoneVerified} />
                            <ProfileItem label="Date Of Birth" value={DUMMY_USER.dateOfBirth} icon={Calendar} />
                            <ProfileItem label="Gender " value={DUMMY_USER.gender} icon={Activity} />
                        </div>
                    </section>

                    <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-orange" /> Security_Protocols
                        </h3>
                        <div className="space-y-4">
                            <SecurityToggle
                                title="Two_Factor_Authentication"
                                desc="Add an extra layer of security to your terminal node"
                                active={DUMMY_USER.twoFactorEnabled}
                            />
                            <SecurityToggle
                                title="Biometric_Session_Lock"
                                desc="Require re-authentication after 15 minutes of inactivity"
                                active={true}
                            />
                        </div>
                    </section>
                </div>

                {/* System Meta Column */}
                <div className="space-y-8">
                    <div className="bg-black text-white dark:bg-white dark:text-black rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-orange/20 blur-[60px] rounded-full" />
                        <h4 className="text-md text-center font-black   mb-8 relative z-10">Access_Metadata</h4>

                        <div className="space-y-6 relative z-10">
                            <MetaRow label="Role" value={DUMMY_USER.role} highlight />
                            <MetaRow label="Account Created" value="JAN_15_2024" />
                            <MetaRow label="Last Login" value="14:30_GMT" />
                            <div className="pt-4 border-t border-white/10 dark:border-black/10">
                                <div className="flex justify-center items-center gap-2 text-orange">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Uplink_Active: 02h 45m</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border border-gray-100 dark:border-white/5 rounded-[32px] bg-gray-50/50 dark:bg-transparent flex flex-col items-center text-center">
                        <AlertTriangle className="w-8 h-8 text-orange mb-4 opacity-50" />
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2">Data_Privacy_Notice</p>
                        <p className="text-[9px] font-medium text-gray-400 leading-relaxed uppercase tracking-wide">
                            Terminal data is encrypted using AES-256 standards in compliance with HIPAA protocols.
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