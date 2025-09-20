import ReactDOM from "react-dom";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useFocus } from "../../hooks/useFocus";

interface Props {
  children: ReactNode;
  onClose: () => void;
  title: string;
  description?: string;
}

export const Modal = ({ children, onClose, title, description }: Props) => {
  const root = document.querySelector("#modal-root");

  const containerRef = useFocus();

  // ESC 키 입력을 통해 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  // 모달이 열릴 때 배경 스크롤 방지
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return root
    ? ReactDOM.createPortal(
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={description ? "modal-description" : undefined}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-screen overflow-auto"
          >
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-800 mb-2"
            >
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-sm mb-4 text-gray-600">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>,
        root,
      )
    : null;
};
