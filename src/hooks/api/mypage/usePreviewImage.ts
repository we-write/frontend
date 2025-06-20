'use client';

import { useState, useEffect, ChangeEvent } from 'react';

const usePreviewImage = (initialUrl: string) => {
  const [previewUrl, setPreviewUrl] = useState(initialUrl);

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 cleanup
      if (previewUrl && previewUrl !== initialUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, initialUrl]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const url = URL.createObjectURL(file);

      // 이전 URL 정리
      if (previewUrl && previewUrl !== initialUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(url);
    }
  };

  return { previewUrl, handleChange };
};

export default usePreviewImage;
