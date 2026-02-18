import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { InputGroup } from "@/components/ui/input-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField } from "@/components/ui/form-field"
import { Link, useLocation, useNavigate } from "react-router"
import { HeartHandshake, Command, ShieldCheck, Activity, Fingerprint, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/auth/useAuth"
import { useState } from "react"

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Loading state added

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {

    setIsLoading(true);
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("AUTH_UPLINK_ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const clinicalFontStack = { fontFamily: "'Roboto', 'Open Sans', 'Helvetica', 'Arial', sans-serif" };

  return (
    <div style={clinicalFontStack} className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#030303]">

      {/* --- LEFT SIDE: BRAND ARCHIVE --- */}
      <div className="relative lg:w-1/2 bg-black flex flex-col justify-between p-8 lg:p-16 min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 opacity-20 grayscale"
          style={{ backgroundImage: "url('/login.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
            <span className="text-[9px] font-mono font-black text-white uppercase tracking-[0.3em]">System_Secure_Entry</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">
            Initialize <br />
            <span className="text-orange italic text-4xl lg:text-6xl">User_Session.</span>
          </h1>

          <p className="text-white/50 text-sm max-w-sm leading-relaxed font-medium">
            Connect to the clinical grid. Access high-fidelity records and secure physician uplinks within the encrypted Medi network.
          </p>
        </div>

        <div className="relative z-10 flex gap-10 border-t border-white/10 pt-8">
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Node_Security</p>
            <p className="text-xs font-bold text-white uppercase flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-orange" /> Verified</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Active_Protocols</p>
            <p className="text-xs font-bold text-white uppercase flex items-center gap-2"><Activity className="w-3 h-3 text-orange" /> AES-256</p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE FORM TERMINAL --- */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-gray-50 dark:bg-[#030303]">
        <div className="w-full max-w-sm space-y-10 relative">

          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">Log In</h2>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">Log in to manage your clinical data.</p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

              <div className="space-y-4">
                <FormField name="email" label="Email">
                  <InputGroup
                    name="email"
                    type="email"
                    placeholder="id@clinical-os.net"
                    icon="email"
                    className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                  />
                </FormField>

                <div>
                  <FormField name="password" label="Password">
                    <InputGroup
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      icon="password"
                      showPasswordToggle
                      className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                    />
                  </FormField>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a href="/forgot-password"
                  className="text-[10px] font-black text-orange uppercase tracking-widest hover:opacity-70 transition-opacity">
                  Forgot_Password?
                </a>
              </div>

              <div className="bg-white/50 dark:bg-white/[0.02] p-4 rounded-xl border border-gray-100 dark:border-white/5">
                <Checkbox
                  {...methods.register("rememberMe")}
                  id="rememberMe"
                  label="Keep me logged in"
                  className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400"
                />
              </div>

              <Button type="submit"
                disabled={isLoading}
                className="rounded-2xl h-16 bg-black dark:bg-white text-white dark:text-black font-black   text-[11px]   hover:bg-orange dark:hover:bg-orange dark:hover:text-white transition-all w-full flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Login <Command className="w-4 h-4" /></>}
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[9px] font-mono font-black uppercase tracking-widest">
                  <span className="px-4 bg-gray-50 dark:bg-[#030303] text-gray-400">External_Auth_Gate</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline"
                  className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none font-black text-[10px] uppercase tracking-widest dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  <Fingerprint className="w-4 h-4 mr-2 text-orange" /> Google
                </Button>
                <Button type="button" variant="outline"
                  className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none font-black text-[10px] uppercase tracking-widest dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  Apple
                </Button>
              </div>
            </form>
          </FormProvider>

          <div className="text-center">
            <p className="text-[11px] font-black dark:text-white uppercase tracking-tighter">
              Don't have an account?
              <Link to="/auth/register" className="text-orange hover:underline ml-2">Sign Up</Link>
            </p>
          </div>

          <div className="flex justify-center gap-8 text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] pt-8">
            <a href="/privacy" className="hover:text-orange transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-orange transition-colors">Terms</a>
            <a href="/help" className="hover:text-orange transition-colors">Help_Link</a>
          </div>
        </div>
      </div>
    </div>
  )
}