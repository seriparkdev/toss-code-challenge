import ReactDOM from "react-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onOverlayClick: () => void;
}

export const Modal = ({ children, onOverlayClick }: Props) => {
  const root = document.querySelector("#modal-root");

  return root
    ? ReactDOM.createPortal(
        <div
          onClick={onOverlayClick}
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
