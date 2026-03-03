import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          // "bg-primary/90 text-white hover:bg-primary ",
          "gap-2 px-6 py-2.5 bg-orange dark:bg-white text-white dark:text-black rounded text-sm font-medium   active:scale-95 transition-all  ",
        destructive:
          "bg-[#0D1A63] text-white shadow-sm hover:bg-[#1A2CA3] dark:bg-red-600 dark:hover:bg-red-700 active:scale-95 transition-all",
        outline:
          "border-2 border-[#1A2CA3] bg-transparent text-[#1A2CA3] dark:border-[#2845D6] dark:text-[#2845D6] shadow-sm hover:bg-[#1A2CA3] hover:text-white dark:hover:bg-[#2845D6] dark:hover:text-white active:scale-95 transition-all",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "text-[#1A2CA3] dark:text-[#2845D6] hover:bg-[#fcfcfc] dark:hover:bg-[#030303] hover:text-[#0D1A63] dark:hover:text-white transition-all",
        link: "text-[#1A2CA3] dark:text-[#2845D6] underline-offset-4 hover:underline hover:text-[#0D1A63] dark:hover:text-white transition-colors",
        denger: "bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-95 transition-all",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
