import { useStoryModal } from '@/providers/StoryWriteOrApproveModalProviders';
import { ContentWriteIcon } from '@public/assets/icons';

const StoryModalTriggerButton = () => {
  const { openModal } = useStoryModal();
  return (
    <button
      onClick={openModal}
      className="fixed right-6 bottom-10 h-15 w-15 md:right-22 md:bottom-14"
    >
      <ContentWriteIcon aria-hidden="true" />
    </button>
  );
};

export default StoryModalTriggerButton;
