'use client';

import CheckBox from '@/components/common/Input/CheckBox';
import useBoolean from '@/hooks/useBoolean';
import React from 'react';

const Home = () => {
  const { value, toggle } = useBoolean();
  return (
    <div className="flex gap-4">
      <CheckBox
        checked={value}
        onChange={toggle}
        label="체크박스"
        labelPosition="right"
      />

      <CheckBox
        checked={value}
        onChange={toggle}
        label="체크박스"
        labelPosition="left"
      />
    </div>
  );
};

export default Home;
