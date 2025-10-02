import ReactDOM from "react-dom";
import type { ReactNode } from "react";
import { useModalBehavior } from "../../hooks/useModalBehavior";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  description,
}: Props) => {
  const { containerRef, titleRef } = useModalBehavior(isOpen, onClose);

  const modalElement = (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title}
        aria-describedby={description}
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-screen overflow-auto pointer-events-auto">
          <h2
            ref={titleRef}
            id={title}
            tabIndex={-1}
            className="text-xl font-semibold text-gray-800 mb-2"
          >
            {title}
          </h2>
          <p id={description} className="text-sm mb-4 text-gray-600">
            {description}
          </p>
          {children}
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalElement, document.body);
};
