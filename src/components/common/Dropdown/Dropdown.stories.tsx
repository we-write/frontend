import { Meta } from '@storybook/react';
import Dropdown from './Dropdown';
import Button from '../Button/Button';
import useBoolean from '@/hooks/useBoolean';
import { useState } from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'common/Dropdown',
  component: Dropdown,
};

export default meta;

export const Default = () => {
  const { value, toggle } = useBoolean();
  const [selected, setSelected] = useState<string>('none');

  const tempOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ];

  return (
    <>
      <Dropdown
        trigger={
          <Button size="custom" onClick={toggle}>
            Dropdown
          </Button>
        }
        isOpen={value}
      >
        <Dropdown.Container>
          {tempOptions.map((option) => (
            <Dropdown.Content
              onClick={() => {
                setSelected(option.value);
                toggle();
              }}
              key={option.value}
              contentItem={
                <div className="hover:bg-write-green-50 h-full w-full rounded-xl px-2 py-1.5">
                  {option.label}
                </div>
              }
            />
          ))}
        </Dropdown.Container>
      </Dropdown>
      <div className="text-2xl font-bold">{'selected: ' + selected}</div>
    </>
  );
};
