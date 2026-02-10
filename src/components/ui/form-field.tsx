import * as React from "react"
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
  

 
    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700 ">
                    {label}
                </label>
            )}
            <div className="mt-2">
                {children}
            </div>

        </div>
    )
}
