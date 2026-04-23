import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full border border-ink-300 bg-background px-4 py-3 text-[0.95rem] text-ink-900 placeholder:text-ink-400 focus-visible:outline-none focus-visible:border-ink-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
