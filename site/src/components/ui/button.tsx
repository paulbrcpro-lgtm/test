import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-ink-900 text-ink-50 hover:bg-ink-950",
        gold: "bg-gold text-ink-950 hover:bg-gold-700 hover:text-white",
        outline: "border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-ink-50",
        ghost: "text-ink-700 hover:text-ink-900 hover:bg-ink-100",
        link: "text-ink-900 underline-offset-4 hover:underline decoration-gold",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-none",
        md: "h-11 px-6 text-[0.95rem] rounded-none",
        lg: "h-13 px-8 text-base rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
