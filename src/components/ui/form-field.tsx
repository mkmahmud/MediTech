import * as React from "react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"

interface FormFieldProps {
    name: string
    label?: string
    children: React.ReactElement
    className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    children,
    className,
}) => {
    const {
        formState: { errors },
    } = useFormContext()

    const error = errors[name]

    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            {children}
            {error && (
                <p className="text-sm text-red-500">{error.message as string}</p>
            )}
        </div>
    )
}
