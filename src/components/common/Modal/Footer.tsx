import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Footer = ({ children }: Props) => {
  return <div className="flex gap-2 pt-4">{children}</div>;
};
