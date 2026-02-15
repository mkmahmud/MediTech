import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { InputGroup } from "@/components/ui/input-group";
import { useAuth } from "@/hooks/auth/useAuth";
import { ShieldAlert } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";


interface ChangePassword {
  currentPassword: string;
  newPassword: String;
  confirmNewPassword: String
}

export default function Settings() {
  // Call Api
  const { changePassword } = useAuth()

  const methods = useForm<ChangePassword>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: '',
    },
  })

  const onSubmit = async (data: ChangePassword) => {

    const finalData = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword
    }

    try {
      await changePassword(finalData);
      toast.success("Password Changed successfully!")
    } catch (err) {
      console.log(err)
    }


    console.log(finalData)


  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-bold italic">Settings</h1>

        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Area */}
        <div className="xl:col-span-2">
          <section className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[2rem] overflow-hidden p-4">
            <div className="p-6 border-b border-gray-50 dark:border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-orange" />
              </div>
              <h3 className="font-bold text-sm">Change Password</h3>
            </div>


            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Current Password */}
                  <div>
                    <FormField name="currentPassword" label="Current Password">
                      <InputGroup
                        name="currentPassword"
                        type="password"
                        placeholder="••••••••"
                        icon="password"
                        showPasswordToggle
                        className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                      />
                    </FormField>
                  </div>

                  {/* New Password */}
                  <div>
                    <FormField name="newPassword" label="New Password">
                      <InputGroup
                        name="newPassword"
                        type="password"
                        placeholder="••••••••"
                        icon="password"
                        showPasswordToggle
                        className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                      />
                    </FormField>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <FormField name="confirmNewPassword" label="Confirm Password">
                      <InputGroup
                        name="confirmNewPassword"
                        type="password"
                        placeholder="••••••••"
                        icon="password"
                        showPasswordToggle
                        className="rounded-2xl h-16 bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white dark:placeholder:text-gray-600 font-bold"
                      />
                    </FormField>
                  </div>
                </div>

                <div className="pt-4">
                  {/* Action Button */}
                  <Button type="submit"
                    className="rounded-2xl h-16 bg-black dark:bg-white text-white dark:text-black font-semibold   text-sm   hover:bg-orange dark:hover:bg-orange dark:hover:text-white transition-all w-full flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95"
                  >
                    Change Password
                  </Button>
                </div>
              </form>
            </FormProvider>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <h4 className="text-[10px] font-bold text-gray-400 mb-4">Security_Tip</h4>
            <p className="text-xs leading-relaxed text-gray-500 italic">
              Ensure your new credentials utilize a mix of alphanumeric nodes and special symbols to maximize encryption strength.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}