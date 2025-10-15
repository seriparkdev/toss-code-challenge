import { useRef, useState } from "react";

export const useOpenFormModal = <T = any>() => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const resolveRef = useRef<((value: T | null) => void) | null>(null);

  const openFormModal = (): Promise<T | null> => {
    setIsOpenModal(true);

    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const submitFormModal = (formValue: T) => {
    if (resolveRef.current) {
      resolveRef.current(formValue);
    }
  };

  const closeFormModal = () => {
    if (resolveRef.current) {
      resolveRef.current(null);
    }

    setIsOpenModal(false);
  };

  return {
    isOpenModal,
    openFormModal,
    submitFormModal,
    closeFormModal,
  };
};
