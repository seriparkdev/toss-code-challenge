import { type ReactNode, useEffect, useRef } from "react";
import { useModalContext } from "../../../contexts/ModalContext";

interface Props {
  children: ReactNode;
}

export const Header = ({ children }: Props) => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const previousFocusElementRef = useRef<HTMLElement | null>(null);

  const { isOpenModal, titleId } = useModalContext();

  // 모달 포커스 핸들링
  useEffect(() => {
    if (!isOpenModal) return;

    // 현재 포커스된 요소 저장
    if (document.activeElement instanceof HTMLElement) {
      previousFocusElementRef.current = document.activeElement;
    }

    // 제목으로 포커스 이동
    requestAnimationFrame(() => {
      titleRef.current?.focus();
    });

    // 모달이 닫힐 때 이전 포커스 복원
    return () => {
      requestAnimationFrame(() => {
        previousFocusElementRef.current?.focus();
      });
    };
  }, [isOpenModal]);

  return (
    <h2
      ref={titleRef}
      id={titleId}
      tabIndex={-1}
      className="text-xl font-semibold text-gray-800 mb-2"
    >
      {children}
    </h2>
  );
};
