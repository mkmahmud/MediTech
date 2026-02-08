 import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { InputGroup } from "@/components/ui/input-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField } from "@/components/ui/form-field"
import { PasswordStrength } from "@/components/ui/password-strength"
import { Link } from "react-router"
import { HeartHandshake, Clock, Shield, CheckCircle2 } from "lucide-react"
import { PhoneInputGroup } from "@/components/ui/phone-Inpu-group"

interface RegisterFormData {
  fullName: string
  email: string
  countryCode: string
  phoneNumber: string
  password: string
  agreeToTerms: boolean
}

export default function RegisterPage() {
  const methods = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+1",
      phoneNumber: "",
      password: "",
      agreeToTerms: false,
    },
    mode: "onChange", // Enable real-time validation and watching
  })

  const password = methods.watch("password")

  // Debug: Watch all form values
  

  const onSubmit = (data: RegisterFormData) => {
    console.log("✅ Register data submitted:", data)
    // Your registration logic here
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Hero Section */}
      <div className="relative lg:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 p-8 lg:p-16 flex flex-col justify-between min-h-[400px] lg:min-h-screen">
        {/* Background decoration */}
         <div className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/reg.jpg')" }}>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center space-x-1 text-white">
              <HeartHandshake className="w-8 h-8" />
              <span>Medi<span className="text-blue-200">.</span></span>
            </Link>
          </div>

          {/* Badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Trusted by 50k+ Patients</span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Healthcare that<br />
              <span className="italic font-light">follows you</span> everywhere.
            </h1>
            <p className="text-blue-100 text-base max-w-md">
              Experience the future of medicine with instant access to top specialists from the comfort of your home.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">24/7 Appointments</h3>
                <p className="text-blue-100 text-sm">Book a consultation anytime, anywhere.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Secure & Private</h3>
                <p className="text-blue-100 text-sm">HIPAA-compliant platform for your peace of mind.</p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 text-white/80 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>ENCRYPTED DATA</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>HIPAA COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-gray-50">
        <div className="w-full max-w-sm space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Join our community and start your wellness journey today.
            </p>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name Field */}
              <FormField name="fullName" label="Full Name">
                <InputGroup
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="rounded-xl h-14 bg-white border-none outline-none"
                />
              </FormField>

              {/* Email Field */}
              <FormField name="email" label="Email Address">
                <InputGroup
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  icon="email"
                  className="rounded-xl h-14 bg-white border-none outline-none"
                />
              </FormField>

              {/* Phone Number Field */}
              <FormField name="phoneNumber" label="Phone Number">
                <PhoneInputGroup
                  countryCodeName="countryCode"
                  phoneNumberName="phoneNumber"
                  placeholder="(555) 000-0000"
                  className="outline-none"
                />
              </FormField>

              {/* Password Field */}
              <div>
                <FormField name="password" label="Password">
                  <InputGroup
                    name="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    icon="password"
                    showPasswordToggle
                    className="rounded-xl h-14 bg-white border-none outline-none"
                  />
                </FormField>
                <PasswordStrength password={password} />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-2">
                <Checkbox
                  {...methods.register("agreeToTerms")}
                  id="agreeToTerms"
                  className="mt-0.5"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-600 cursor-pointer">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-500 hover:text-blue-600 font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-500 hover:text-blue-600 font-medium">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                className="w-full rounded-xl h-14 bg-blue-500 hover:bg-blue-600 text-white font-medium border-none outline-none cursor-pointer flex items-center justify-center gap-2"
              >
                Create Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-50 text-gray-500">OR SIGN UP WITH</span>
                </div>
              </div>

              {/* Social Sign Up Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl h-14 bg-white hover:bg-gray-50 border-none outline-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl h-14 bg-white hover:bg-gray-50 border-none outline-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Apple ID
                </Button>
              </div>
            </form>
          </FormProvider>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/auth/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
