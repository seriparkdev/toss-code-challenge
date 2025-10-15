import type { FormHTMLAttributes, ReactNode } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Root = ({ children, ...props }: Props) => {
  return (
    <form className="space-y-4" {...props}>
      {children}
    </form>
  );
};
