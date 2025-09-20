import ReactDOM from "react-dom";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  const root = document.querySelector("#modal-root");

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  return root
    ? ReactDOM.createPortal(
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-screen overflow-auto"
          >
            {children}
          </div>
        </div>,
        root,
      )
    : null;
};
