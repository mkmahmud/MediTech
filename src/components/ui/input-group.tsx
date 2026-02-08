import * as React from "react"
import { useFormContext, Controller } from "react-hook-form"
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
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  name, 
  type = "text", 
  placeholder, 
  icon, 
  showPasswordToggle = false, 
  className 
}) => {
  const { control } = useFormContext()
  const [showPassword, setShowPassword] = React.useState(false)

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
    <Controller
      name={name}
      control={control}
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
              className
            )}
            onChange={(e) => {
              field.onChange(e)
              console.log(`${name} changed:`, e.target.value)
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
  )
}

InputGroup.displayName = "InputGroup"
