import { useModalContext } from "../../../contexts/ModalContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Description = ({ children }: Props) => {
  const { descriptionId } = useModalContext();
  return (
    <p id={descriptionId} className="text-sm mb-4 text-gray-600">
      {children}
    </p>
  );
};
