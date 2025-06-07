import useBoolean from '@/hooks/useBoolean';
import { createContext, useContext, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface StoryWriteOrApproveModalProvidersProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const StoryWriteOrApproveModalProviders = ({
  children,
}: StoryWriteOrApproveModalProvidersProps) => {
  const {
    value: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean();

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useStoryModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'useModal 훅은 StoryWriteOrApproveModalProviders 컴포넌트 내부에서 사용되어야 합니다'
    );
  }
  return context;
};
