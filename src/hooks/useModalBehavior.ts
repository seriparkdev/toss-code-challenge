import { useEffect, useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";

export const useModalBehavior = (isOpen: boolean, onClose: () => void) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const previousFocusElementRef = useRef<HTMLElement | null>(null);

  useFocusTrap(isOpen, containerRef.current);

  // 모달이 열릴 때 배경 스크롤 방지
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  // ESC 키 입력 시 모달 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  // 모달 포커스 핸들링
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  return { containerRef, titleRef };
};
