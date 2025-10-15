import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Input, type InputProps } from "../Input";

const labelVariants = cva(["block font-medium text-gray-700 mb-1"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const errorMessageVariants = cva(["mt-1 text-red-600"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface InputFieldProps extends InputProps {
  label?: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      id,
      size = "md",
      fullWidth = true,
      required,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={fullWidth ? "w-full" : "w-auto"}>
        {label && (
          <label htmlFor={inputId} className={labelVariants({ size })}>
            {label}
          </label>
        )}
        <Input
          ref={ref}
          id={inputId}
          size={size}
          fullWidth={fullWidth}
          required={required}
          aria-describedby={errorId}
          aria-invalid={error ? "true" : "false"}
          aria-required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className={errorMessageVariants({ size })}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
