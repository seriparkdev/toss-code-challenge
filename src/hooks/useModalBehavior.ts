import { useEffect, useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";
import { useModalContext } from "../contexts/ModalContext";

export const useModalBehavior = () => {
  const { closeFormModal, isOpenModal } = useModalContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(isOpenModal, containerRef.current);

  // 모달이 열릴 때 배경 스크롤 방지
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpenModal]);

  // ESC 키 입력 시 모달 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpenModal) {
        closeFormModal();
      }
    };

    if (isOpenModal) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpenModal, closeFormModal]);

  return { containerRef };
};
