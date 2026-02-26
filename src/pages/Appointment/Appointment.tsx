import { FormField } from "@/components/ui/form-field";
import { InputGroup } from "@/components/ui/input-group";
import { SelectGroup } from "@/components/ui/SelectGroup";
import { SPECIALIZATIONS } from "@/types/doctors";
import { Plus, Search } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export default function Appointment() {

    const methods = useForm({ defaultValues: { search: "" } });

    // Categorys

    // Handle submit
    const onSubmit = async (data: any) => {
        try {
            console.log(data)
            methods.reset();
        } catch (error) {
        }
    };


    return (
        <section className="min-h-screen bg-light-bg dark:bg-dark-bg   dark:text-white selection:bg-orange">
            {/* Appointment page content */}
            <section className="sticky top-24 z-40 px-6 lg:px-24 py-6 bg-light-bg/80 dark:bg-dark-bg/80   dark:border-white/5">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="max-w-7xl   mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 w-full lg:w-1/2 relative">
                                <FormField name="specialization"  >
                                    <SelectGroup
                                        name="specialization"
                                         icon="role"
                                        options={SPECIALIZATIONS.map(s => ({ label: s, value: s }))}
                                        rules={{
                                            required: "User Role is required"

                                        }}
                                    />
                                </FormField>
                            </div>

                            <div className="w-full lg:w-1/2 relative">

                                <InputGroup
                                    name="search"
                                    placeholder="Type Doctor Name (eg, Dr. John Smith)..."
                                    className="rounded-full h-14 bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 px-8     focus:border-orange transition-all"
                                />

                                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                            </div>
                        </div>
                    </form>

                </FormProvider>
            </section>
        </section>
    )
}
