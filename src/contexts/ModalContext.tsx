import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useRef,
  useState,
} from "react";

interface ModalContextType<T = any> {
  isOpenModal: boolean;
  titleId: string;
  descriptionId: string;
  openFormModal: () => Promise<T | null>;
  submitFormModal: (formValue: T) => void;
  closeFormModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = <T = any,>(): ModalContextType<T> => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const ModalProvider = ({ children }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const resolveRef = useRef<((value: any | null) => void) | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const openFormModal = (): Promise<any | null> => {
    setIsOpenModal(true);

    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const submitFormModal = (formValue: any) => {
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

  return (
    <ModalContext.Provider
      value={{
        isOpenModal,
        titleId,
        descriptionId,
        openFormModal,
        submitFormModal,
        closeFormModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
