import * as React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Input } from "./input"
import { Select } from "./select"
import { cn } from "@/lib/utils"
import { Phone } from "lucide-react"

interface PhoneInputGroupProps {
  countryCodeName: string
  phoneNumberName: string
  placeholder?: string
  className?: string
}

export const PhoneInputGroup: React.FC<PhoneInputGroupProps> = ({
  countryCodeName,
  phoneNumberName,
  placeholder = "(555) 000-0000",
  className
}) => {
  const { control } = useFormContext()

  return (
    <div className="flex gap-2">
      {/* Country Code Selector */}
      <div className="w-28">
        <Controller
          name={countryCodeName}
          control={control}
          render={({ field }) => (
            <Select 
              {...field} 
              className={cn("rounded-xl bg-white border-none h-14", className)}
              onChange={(e) => {
                field.onChange(e)
                console.log(`${countryCodeName} changed:`, e.target.value)
              }}
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+91">+91</option>
              <option value="+86">+86</option>
              <option value="+81">+81</option>
              <option value="+49">+49</option>
              <option value="+33">+33</option>
              <option value="+39">+39</option>
              <option value="+34">+34</option>
              <option value="+61">+61</option>
              <option value="+55">+55</option>
              <option value="+52">+52</option>
            </Select>
          )}
        />
      </div>

      {/* Phone Number Input */}
      <div className="flex-1 relative">
        <Controller
          name={phoneNumberName}
          control={control}
          render={({ field }) => (
            <>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                <Phone className="h-5 w-5" />
              </div>
              <Input
                {...field}
                type="tel"
                placeholder={placeholder}
                className={cn("pl-12 rounded-xl bg-white border-none h-14", className)}
                onChange={(e) => {
                  field.onChange(e)
                  console.log(`${phoneNumberName} changed:`, e.target.value)
                }}
              />
            </>
          )}
        />
      </div>
    </div>
  )
}

PhoneInputGroup.displayName = "PhoneInputGroup"
