import * as React from "react"
import { useFormContext, Controller } from "react-hook-form"
import type { RegisterOptions } from "react-hook-form"
import { Textarea } from "./textarea"  
import { cn } from "@/lib/utils"
import { FileText, MessageSquare, StickyNote, Activity } from "lucide-react"

interface TextareaGroupProps {
    name: string
    placeholder?: string
    icon?: "complaint" | "notes" | "general" | "activity"
    className?: string
    textareaClassName?: string
    rules?: RegisterOptions
    rows?: number
}

export const TextareaGroup: React.FC<TextareaGroupProps> = ({
    name,
    placeholder,
    icon,
    className,
    textareaClassName,
    rules,
    rows = 4
}) => {
    const { control, formState: { errors } } = useFormContext()
    const error = errors[name]

    const IconComponent =
        icon === "complaint" ? FileText :
            icon === "notes" ? StickyNote :
                icon === "activity" ? Activity :
                    icon === "general" ? MessageSquare :
                        null

    return (
        <div className={cn("w-full", className)}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <div className="relative">
                        {IconComponent && (
                            <div className="absolute left-4 top-4 text-gray-400 z-10">
                                <IconComponent className="h-5 w-5" />
                            </div>
                        )}
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            rows={rows}
                            className={cn(
                                "resize-none transition-all focus-visible:ring-orange",
                                IconComponent && "pl-12",
                                error && "border-red-500 focus-visible:ring-red-500",
                                textareaClassName
                            )}
                            onChange={(e) => {
                                field.onChange(e)
                            }}
                        />
                    </div>
                )}
            />
            {error && (
                <p className="text-xs text-red-500 mt-2 font-medium animate-in fade-in slide-in-from-top-1">
                    {error.message as string}
                </p>
            )}
        </div>
    )
}

TextareaGroup.displayName = "TextareaGroup"