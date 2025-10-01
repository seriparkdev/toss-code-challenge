import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariant> {
  children: ReactNode;
}

const ButtonVariant = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium text-sm leading-4",
    "border border-transparent rounded-md",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-blue-600 text-white shadow-sm",
          "hover:bg-blue-700 hover:shadow-md",
          "focus:ring-blue-500",
          "active:bg-blue-800",
        ],
        secondary: [
          "bg-white text-gray-900 shadow-sm border-gray-300",
          "hover:bg-gray-50 hover:shadow-md",
          "focus:ring-blue-500",
          "active:bg-gray-100",
        ],
        outline: [
          "bg-transparent text-blue-600 border-blue-600",
          "hover:bg-blue-50 hover:text-blue-700",
          "focus:ring-blue-500",
          "active:bg-blue-100",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export const Button = ({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={ButtonVariant({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </button>
  );
};
