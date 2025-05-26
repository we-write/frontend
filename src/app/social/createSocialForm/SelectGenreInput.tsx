import {
  CreateWriteRequest,
  GENRE_LOCATION_MAP,
  GenreType,
} from '@/api/social/type';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import Input from '@/components/common/Input/Input';
import useBoolean from '@/hooks/useBoolean';
import { useFormContext } from 'react-hook-form';

const SelectGenreInput = () => {
  const { value: isOpen, toggle, setFalse: onClose } = useBoolean();
  const { setValue, register } = useFormContext<CreateWriteRequest>();

  return (
    <div className="flex flex-col">
      <label htmlFor="genre" className="mb-2 text-sm font-semibold">
        장르
      </label>
      <Dropdown
        trigger={
          <Input
            name="genre"
            type="text"
            placeholder="장르를 선택해주세요."
            register={register('location')}
            readOnly
            className="cursor-pointer outline-none"
            onClick={toggle}
          />
        }
        isOpen={isOpen}
      >
        <Dropdown.Container className="fixed z-10 shadow-md">
          {Object.entries(GENRE_LOCATION_MAP).map(([key]) => (
            <Dropdown.Content
              key={key}
              contentItem={
                <p className="hover:bg-write-green-50 rounded-md p-2">{key}</p>
              }
              onClick={() => {
                setValue('location', key as GenreType);
                onClose();
              }}
            />
          ))}
        </Dropdown.Container>
      </Dropdown>
    </div>
  );
};

export default SelectGenreInput;
