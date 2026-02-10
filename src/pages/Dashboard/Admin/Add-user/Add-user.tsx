import {
    UserPlus, ShieldCheck, Fingerprint,
    Briefcase, Save, ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { FormField } from '@/components/ui/form-field';
import { InputGroup } from '@/components/ui/input-group';
import { SelectGroup } from '@/components/ui/SelectGroup';
import { useAuth } from '@/hooks/auth/useAuth';
import { toast } from 'sonner';

interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

const ROLE_OPTIONS = [
    { label: "Medical Doctor", value: "DOCTOR" },
    { label: "Clinical Nurse", value: "NURSE" },
    { label: "Reception Desk", value: "RECEPTIONIST" },
    { label: "Pharmacy Node", value: "PHARMACIST" },
    { label: "Lab Technician", value: "LAB_TECHNICIAN" },
];

export default function AddUserPage() {

    const { createUser } = useAuth();

    const methods = useForm<CreateUserData>({
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            role: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = methods;

    const watchedValues = useWatch({ control: methods.control });
    const { firstName, lastName, email, role } = watchedValues;

    const onSubmit = async (data: CreateUserData) => {
        try {
            await createUser(data);

            toast.success("User created successfully!");
            methods.reset();
        } catch (error) {
            toast.error("Error creating user. Please try again.");
        }
    };

    const clinicalFontStack = { fontFamily: "'Roboto', sans-serif" };

    return (
        <div style={clinicalFontStack} className="space-y-10 font-['Roboto']">
            {/* Header Segment */}

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldAlert className="w-4 h-4 text-orange" />
                                <span className="text-[10px] font-black text-gray-400    ">Auth_Provisioning_Protocol</span>
                            </div>
                            <h1 className="text-4xl font-black   italic  ">Create New Account</h1>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-orange hover:bg-orange/90 text-white px-10 py-6 rounded-2xl font-black   text-xs tracking-widest shadow-lg shadow-orange/20 transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Submitting...' : 'Add new User'}
                        </Button>
                    </header>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Primary Data Column */}
                        <div className="xl:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8">
                                <h3 className="text-[11px] font-black   tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4 text-orange" /> Identity_Matrix
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField name="firstName" label="First Name">
                                        <InputGroup
                                            name="firstName"
                                            rules={{
                                                required: "First Name is required",
                                                
                                            }}
                                            type="text"
                                            placeholder="First Name"
                                            icon="user"
                                            className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                                        />
                                    </FormField>
                                    <FormField name="lastName" label="Last Name">
                                        <InputGroup
                                            name="lastName"
                                            type="text"
                                             rules={{
                                                required: "Last Name is required",
                                                
                                            }}
                                            placeholder="Last Name"
                                            icon="user"
                                            className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                                        />
                                    </FormField>

                                </div>
                                <FormField name="email" label="Email" className='mt-10'>
                                    <InputGroup
                                        name="email"
                                        type="email"
                                        placeholder="id@clinical-os.net"
                                        icon="email"
                                        rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email address"
                                            }
                                        }}
                                        className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                                    />
                                </FormField>
                            </div>

                            <div className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8">
                                <h3 className="text-[11px] font-black   tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-orange" /> Operational_Deployment
                                </h3>

                                <FormField name="role" label="User Role" className="mt-6 font-['Roboto']">
                                    <SelectGroup
                                        name="role"
                                        placeholder="SELECT_ROLE_TYPE"
                                        icon="role"
                                        options={ROLE_OPTIONS}
                                        rules={{
                                            required: "User Role is required"
                                            
                                        }}
                                    />
                                </FormField>
                            </div>
                        </div>

                        {/* System Summary Column */}
                        <div className="space-y-6">
                            <div className="bg-black text-white dark:bg-white dark:text-black rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-orange/20 blur-[60px] rounded-full" />

                                <h4 className="text-xs font-black     mb-10 relative z-10">Provisioning_Preview</h4>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex flex-col items-center py-6 border-y border-white/10 dark:border-black/10">
                                        <div className="w-20 h-20 bg-orange rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-orange/40">
                                            <UserPlus className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-[8px] font-black text-orange    italic">new User</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black   opacity-50  ">First Name</span>
                                            <span className="text-[11px] font-bold">{firstName || '---'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black   opacity-50  ">Last Name</span>
                                            <span className="text-[11px] font-bold">{lastName || '---'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black   opacity-50  ">Email</span>
                                            <span className="text-[11px] font-bold">{email || '---'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black   opacity-50  ">Auth_Level</span>
                                            <span className="text-[11px] font-bold text-orange">{role || 'NOT_SET'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black   opacity-50  ">Encryption</span>
                                            <span className="text-[11px] font-bold">AES_256_ACTIVE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border border-gray-100 dark:border-white/5 rounded-[32px] bg-gray-50/50 dark:bg-transparent">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span className="text-[10px] font-black   tracking-widest">Security_Compliant</span>
                                </div>
                                <p className="text-[9px] font-bold text-gray-400 leading-relaxed   tracking-wide">
                                    System will generate a temporary authentication token and transmit it to the provided uplink address upon provisioning.
                                </p>
                            </div>
                        </div>
                    </div>

                </form>
            </FormProvider>
        </div>
    );
}