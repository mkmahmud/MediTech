import * as React from "react"
import { useFormContext, Controller, type RegisterOptions } from "react-hook-form"
import { Select } from "./select" // Path to your existing Select component
import { cn } from "@/lib/utils"
import { ShieldCheck, Layers, Briefcase } from "lucide-react"

interface SelectOption {
    label: string
    value: string
}

interface SelectGroupProps {
    name: string
    options: SelectOption[]
    icon?: "role" | "dept" | "security"
    className?: string
    placeholder?: string
    rules?: RegisterOptions
}

export const SelectGroup: React.FC<SelectGroupProps> = ({
    name,
    options,
    icon,
    className,
    placeholder,
    rules
}) => {
    const { control } = useFormContext()

    const IconComponent =
        icon === "role" ? ShieldCheck :
            icon === "dept" ? Layers :
                icon === "security" ? Briefcase :
                    null

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <div className="relative font-['Roboto']">
                    {IconComponent && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                            <IconComponent className="h-5 w-5" />
                        </div>
                    )}

                    <Select
                        {...field}
                        className={cn(
                            "h-16 rounded-2xl bg-white dark:bg-white/[0.02] border-none outline-none shadow-sm dark:text-white font-bold transition-all focus:ring-1 focus:ring-orange appearance-none",
                            IconComponent && "pl-12",
                            className
                        )}
                        onChange={(e) => {
                            field.onChange(e)
                        }}
                    >
                        {placeholder && (
                            <option value="" disabled className="text-gray-400">
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white py-2 font-bold uppercase text-sm"
                            >
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </div>
            )}
        />
    )
}

SelectGroup.displayName = "SelectGroup"