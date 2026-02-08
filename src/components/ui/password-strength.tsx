import * as React from "react"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string | undefined
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = "" }) => {
  const calculateStrength = (pwd: string): { strength: number; label: string; color: string } => {
    if (!pwd || pwd.length === 0) {
      return { strength: -1, label: "", color: "" }
    }
    
    let points = 0
    
    // Length checks
    if (pwd.length >= 8) points += 1
    if (pwd.length >= 12) points += 1
    
    // Character variety checks
    if (/[a-z]/.test(pwd)) points += 1
    if (/[A-Z]/.test(pwd)) points += 1
    if (/[0-9]/.test(pwd)) points += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) points += 1
    
    // Calculate strength level (0-3)
    let strength = 0
    if (points <= 2) strength = 0 // Weak
    else if (points <= 3) strength = 1 // Fair
    else if (points <= 4) strength = 2 // Good
    else strength = 3 // Strong
    
    const strengthData = [
      { label: "Weak", color: "red" },
      { label: "Fair", color: "orange" },
      { label: "Good", color: "yellow" },
      { label: "Strong", color: "green" }
    ]
    
    return { 
      strength, 
      label: strengthData[strength].label,
      color: strengthData[strength].color
    }
  }

  const { strength, label, color } = calculateStrength(password || "")

  // Don't show anything if no password entered
  if (!password || password.length === 0) {
    return null
  }

  const getBarColorClass = (index: number) => {
    if (index <= strength) {
      if (color === "red") return "bg-red-500"
      if (color === "orange") return "bg-orange-500"
      if (color === "yellow") return "bg-yellow-500"
      if (color === "green") return "bg-green-500"
    }
    return "bg-gray-200"
  }

  const getTextColorClass = () => {
    if (color === "red") return "text-red-500"
    if (color === "orange") return "text-orange-500"
    if (color === "yellow") return "text-yellow-600"
    if (color === "green") return "text-green-500"
    return "text-gray-500"
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              getBarColorClass(index)
            )}
          />
        ))}
      </div>
      <p className={cn("text-xs font-medium transition-colors", getTextColorClass())}>
        Password strength: {label}
      </p>
    </div>
  )
}
