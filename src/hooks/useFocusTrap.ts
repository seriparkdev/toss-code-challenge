import { useCallback, useEffect, useRef } from "react";

export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getFocusableElements = useCallback(
    (container: HTMLElement): HTMLElement[] => {
      const focusableElements = [
        "button:not(:disabled)",
        "input:not(:disabled)",
        "textarea:not(:disabled)",
        "select:not(:disabled)",
        "a[href]",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");

      return Array.from(container.querySelectorAll(focusableElements));
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableArray = getFocusableElements(container);

      if (focusableArray.length === 0) return;

      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        // 첫 번째 포커스 가능한 요소에서 역방향 탭을 누르면 마지막 포커스 가능한 요소로 이동
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        // 마지막 포커스 가능한 요소에서 탭을 누르면 첫 번째 포커스 가능한 요소로 이동
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    return () => container.removeEventListener("keydown", handleTabKey);
  }, [isActive, getFocusableElements]);

  return containerRef;
};
