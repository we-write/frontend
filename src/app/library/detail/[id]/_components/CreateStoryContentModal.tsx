import { Modal } from '@/components/common/Modal/Modal';
import { ContentWriteIcon } from '@public/assets/icons';
import Button from '@/components/common/Button/Button';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import useBoolean from '@/hooks/useBoolean';
import { useForm, Controller } from 'react-hook-form';
import { CreateStoryModalProps, RelayStoryContentFormData } from './type';

const CreateStoryModal = ({ currentChapter }: CreateStoryModalProps) => {
  const {
    value: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean();

  const { control, handleSubmit } = useForm<RelayStoryContentFormData>({
    defaultValues: {
      content: '',
    },
  });

  const handleTemporarySave = () => {
    //MEMO : 로직 추가해주세요
  };

  const onSubmit = () => {
    //MEMO : 로직 추가해주세요
  };

  return (
    <>
      <button onClick={openModal} className="fixed right-10 bottom-10">
        <ContentWriteIcon />
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} className="w-fit">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <h2 className="mb-2 text-3xl">이어질 이야기를 작성해주세요</h2>
            <p className="text-3xl font-bold">현재 챕터 {currentChapter}</p>
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextEditor
                editorHeight="500px"
                initialContent={value}
                onChange={onChange}
              />
            )}
          />

          <div className="mt-6 flex justify-end gap-2">
            <Button
              type="button"
              onClick={handleTemporarySave}
              color="secondary"
              variant="inverted"
              size="custom"
              className="w-24"
            >
              임시저장
            </Button>
            <Button
              type="submit"
              color="secondary"
              size="custom"
              className="w-24"
            >
              등록하기
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateStoryModal;
