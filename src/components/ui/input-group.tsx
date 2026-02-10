import * as React from "react"
import { useFormContext, Controller } from "react-hook-form"
import type { RegisterOptions } from "react-hook-form"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"

interface InputGroupProps {
  name: string
  type?: string
  placeholder?: string
  icon?: "email" | "password" | "user"
  showPasswordToggle?: boolean
  className?: string
  rules?: RegisterOptions
}

export const InputGroup: React.FC<InputGroupProps> = ({
  name,
  type = "text",
  placeholder,
  icon,
  showPasswordToggle = false,
  className,
  rules
}) => {
  const { control, formState: { errors } } = useFormContext()
  const [showPassword, setShowPassword] = React.useState(false)
  const error = errors[name]

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type

  const IconComponent =
    icon === "email" ? Mail :
      icon === "password" ? Lock :
        icon === "user" ? User :
          null

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="relative">
            {IconComponent && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                <IconComponent className="h-5 w-5" />
              </div>
            )}
            <Input
              {...field}
              type={inputType}
              placeholder={placeholder}
              className={cn(
                IconComponent && "pl-12",
                showPasswordToggle && "pr-12",
                error && "border-red-500",
                className
              )}
              onChange={(e) => {
                field.onChange(e)
              }}
            />
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        )}
      />
      {error && (
        <p className="text-xs text-red-500 mt-2 font-medium">
          {error.message as string}
        </p>
      )}
    </>
  )
}

InputGroup.displayName = "InputGroup"