import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  [
    "w-full border rounded-md",
    "focus:outline-none focus:ring-2 focus:border-transparent",
    "transition-all duration-200 ease-in-out",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
    "border-gray-300 bg-white text-gray-900",
    "hover:border-gray-400",
    "focus:ring-blue-500 focus:border-blue-500",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 py-1 text-sm",
        md: "h-10 px-3 py-2 text-base",
        lg: "h-12 px-4 py-3 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: true,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, fullWidth, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={inputVariants({
          size,
          fullWidth,
          className,
        })}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
