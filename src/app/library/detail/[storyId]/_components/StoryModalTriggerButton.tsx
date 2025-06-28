import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/queryClinet';
import { useStoryModal } from '@/providers/StoryWriteOrApproveModalProviders';
import { ContentWriteIcon } from '@public/assets/icons';

const StoryModalTriggerButton = ({ storyId }: { storyId: string }) => {
  const { openModal } = useStoryModal();
  const queryClient = getQueryClient();

  const handleOpenModal = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_LAST_CONTENT, storyId],
    });
    openModal();
  };

  return (
    <button
      onClick={handleOpenModal}
      className="fixed right-6 bottom-10 h-15 w-15 md:right-22 md:bottom-14"
    >
      <ContentWriteIcon aria-hidden="true" />
    </button>
  );
};

export default StoryModalTriggerButton;
