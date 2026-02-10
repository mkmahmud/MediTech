import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { InputGroup } from "@/components/ui/input-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField } from "@/components/ui/form-field"
import { PasswordStrength } from "@/components/ui/password-strength"
import { Link, useNavigate } from "react-router"
import { HeartHandshake, Command, ShieldCheck, Fingerprint, CheckCircle2 } from "lucide-react"
import { PhoneInputGroup } from "@/components/ui/phone-Inpu-group"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/auth/useAuth"
import { toast } from "sonner"

interface RegisterFormData {
  fullName: string
  email: string
  countryCode: string
  phoneNumber: string
  password: string
  agreeToTerms: boolean
}

export default function RegisterPage() {

  // Call Api
  const { register } = useAuth();

  // Navigation
  const navigate = useNavigate();

  const methods = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+1",
      phoneNumber: "",
      password: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  })




  const password = methods.watch("password")

  // Handle Registration 
  const onSubmit = async (data: RegisterFormData) => {
    // Split full name into first and last names
    const nameParts = data.fullName.trim().split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(" ") || "L"

    // Join country code and phone number
    const phoneNumber = `${data.countryCode}${data.phoneNumber}`

    // Append processed fields to data
    const processedData = {
      email: data.email,
      password: data.password,
      firstName,
      lastName,
      phoneNumber,
    }



    try {
      await register(processedData);
      toast.success("Registration successful! Please log in.");
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }


  }

  const clinicalFontStack = { fontFamily: "'Roboto', 'Open Sans', 'Helvetica', 'Arial', sans-serif" };

  return (
    <div style={clinicalFontStack} className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#030303]">

      {/* --- LEFT SIDE: BRAND ARCHIVE --- */}
      <div className="relative lg:w-1/2 bg-black flex flex-col justify-between p-8 lg:p-16 min-h-[400px] overflow-hidden">
        {/* Background Visualizer Overlay */}
        <div className="absolute inset-0 opacity-20 grayscale"
          style={{ backgroundImage: "url('/reg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 uppercase">
            <div className="bg-orange p-1.5 rounded-lg">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <span>Medi<span className="text-orange">.</span></span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
            <span className="text-[9px] font-mono font-black text-white uppercase tracking-[0.3em]">Network_Registration_Active</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">
            Create <br />
            <span className="text-orange italic text-4xl lg:text-6xl">New_Identity.</span>
          </h1>

          <p className="text-white/50 text-sm max-w-sm leading-relaxed font-medium uppercase tracking-tight">
            Join 50k+ verified patients. Access the clinical grid with instant specialist uplinks and encrypted record management.
          </p>
        </div>

        <div className="relative z-10 flex gap-10 border-t border-white/10 pt-8">
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Data_Security</p>
            <p className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-orange" /> HIPAA_Compliant
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Verification</p>
            <p className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-orange" /> Trusted_Node
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE FORM TERMINAL --- */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50 dark:bg-[#030303]">
        <div className="w-full max-w-sm space-y-8 relative">

          {/* Header UI */}
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">Create Account</h2>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">Initialize your clinical wellness journey.</p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">

              <div className="space-y-3">
                {/* Full Name Field */}
                <FormField name="fullName" label="Name">
                  <InputGroup
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                  />
                </FormField>

                {/* Email Field */}
                <FormField name="email" label="Email">
                  <InputGroup
                    name="email"
                    type="email"
                    placeholder="id@clinical-os.net"
                    icon="email"
                    className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                  />
                </FormField>

                {/* Phone Number Field */}
                <FormField name="phoneNumber" label="Phone Number">
                  <div className="dark:bg-white/[0.02] rounded-2xl overflow-hidden px-1">
                    <PhoneInputGroup
                      countryCodeName="countryCode"
                      phoneNumberName="phoneNumber"
                      placeholder="(555) 000-0000"
                      className="outline-none border-none h-14 font-bold dark:text-white bg-transparent"
                    />
                  </div>
                </FormField>

                {/* Password Field */}
                <div className="space-y-2">
                  <FormField name="password" label="Password">
                    <InputGroup
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      icon="password"
                      showPasswordToggle
                      className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                    />
                  </FormField>
                  <PasswordStrength password={password} />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                <Checkbox
                  {...methods.register("agreeToTerms")}
                  id="agreeToTerms"
                  className="mt-1"
                />
                <label htmlFor="agreeToTerms" className="text-[10px] font-bold uppercase tracking-tight text-gray-500 dark:text-gray-400 cursor-pointer leading-tight">
                  I accept the{" "}
                  <a href="/terms" className="text-orange hover:underline font-black">Clinical_Terms</a>{" "}
                  &{" "}
                  <a href="/privacy" className="text-orange hover:underline font-black">Data_Policy</a>.
                </label>
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                className="w-full rounded-2xl h-16 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[11px] tracking-[0.3em] hover:bg-orange dark:hover:bg-orange dark:hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95"
              >
                Create Account <Command className="w-4 h-4" />
              </Button>

              {/* Tactical Divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[9px] font-mono font-black uppercase tracking-widest">
                  <span className="px-4 bg-gray-50 dark:bg-[#030303] text-gray-400">External_Auth_Link</span>
                </div>
              </div>

              {/* Social Sign Up Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline"
                  className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none font-black text-[10px] uppercase tracking-widest dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  <Fingerprint className="w-4 h-4 mr-2 text-orange" /> Google
                </Button>
                <Button type="button" variant="outline"
                  className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none font-black text-[10px] uppercase tracking-widest dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  Apple ID
                </Button>
              </div>
            </form>
          </FormProvider>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-[11px] font-black dark:text-white uppercase tracking-tighter">
              Already have an account?
              <Link to="/auth/login" className="text-orange hover:underline ml-2">Log In</Link>
            </p>
          </div>

          {/* Tactical Footer */}
          <div className="flex justify-center gap-8 text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] pt-4">
            <a href="/privacy" className="hover:text-orange transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-orange transition-colors">Terms</a>
            <a href="/help" className="hover:text-orange transition-colors">Help_Link</a>
          </div>
        </div>
      </div>
    </div>
  )
}