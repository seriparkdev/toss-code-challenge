import ReactDOM from "react-dom";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useFocus } from "../../hooks/useFocus";

interface Props {
  children: ReactNode;
  onClose: () => void;
  title: string;
}

export const Modal = ({ children, onClose, title }: Props) => {
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
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-screen overflow-auto"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {title}
            </h2>
            {children}
          </div>
        </div>,
        root,
      )
    : null;
};
