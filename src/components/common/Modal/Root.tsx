import ReactDOM from "react-dom";
import { type ReactNode, useEffect } from "react";
import { useModalBehavior } from "../../../hooks/useModalBehavior";
import { useModalContext } from "../../../contexts/ModalContext";

interface Props {
  children: ReactNode;
}

export const Root = ({ children }: Props) => {
  const { isOpenModal, titleId, descriptionId, closeFormModal } =
    useModalContext();
  const { containerRef } = useModalBehavior();

  useEffect(() => {
    if (!isOpenModal) return;
  }, [isOpenModal]);

  if (!isOpenModal) return null;

  const modalElement = (
    <>
      <div
        aria-hidden="true"
        onClick={closeFormModal}
        className="fixed inset-0 bg-black/50 z-50"
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-screen overflow-auto pointer-events-auto">
          {children}
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalElement, document.body);
};
