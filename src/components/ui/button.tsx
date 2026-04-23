import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-ink-950 hover:bg-gold-400 shadow-[0_0_0_1px_rgba(234,179,8,0.3),0_8px_32px_-8px_rgba(234,179,8,0.5)]",
        secondary:
          "bg-ink-50 text-ink-950 hover:bg-ink-100",
        outline:
          "border border-ink-700 text-ink-50 hover:bg-ink-800 hover:border-ink-600",
        ghost:
          "text-ink-200 hover:text-ink-50 hover:bg-ink-800",
        link:
          "text-ink-50 underline-offset-4 hover:underline decoration-gold hover:text-gold",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-full",
        md: "h-11 px-5 text-[0.95rem] rounded-full",
        lg: "h-13 px-7 text-base rounded-full",
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
