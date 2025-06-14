'use client';

import { useState, ChangeEvent } from 'react';

const usePreviewImage = (initialUrl: string) => {
  const [previewUrl, setPreviewUrl] = useState(initialUrl);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return { previewUrl, handleChange };
};

export default usePreviewImage;
