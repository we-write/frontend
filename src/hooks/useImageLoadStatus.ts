'use client';
import { useState } from 'react';

const useImageLoadStatus = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageLoadError, setIsImageLoadError] = useState(false);

  return {
    isImageLoaded,
    isImageLoadError,
    onLoad: () => setIsImageLoaded(true),
    onError: () => setIsImageLoadError(true),
  };
};

export default useImageLoadStatus;
