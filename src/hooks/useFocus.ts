import { useEffect, useRef } from "react";

export const useFocus = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // 현재 포커스된 요소 저장
    if (document.activeElement instanceof HTMLElement) {
      previousFocusElementRef.current = document.activeElement;
    }

    return () => {
      // 모달이 닫힐 때 이전 포커스된 요소로 복원
      if (previousFocusElementRef.current) {
        previousFocusElementRef.current.focus();
      }
    };
  }, []);

  // 모달이 열리면 제목 요소에 포커스
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const titleElement = container.querySelector(
      'h1, h2, h3, [role="heading"]',
    ) as HTMLElement;
    if (titleElement) {
      titleElement.setAttribute("tabindex", "-1");
      titleElement.focus();
    }
  }, []);

  return containerRef;
};
