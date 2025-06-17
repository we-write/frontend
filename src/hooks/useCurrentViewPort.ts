'use client';

import { useEffect, useState } from 'react';

const useCurrentViewPort = () => {
  const [viewportWidth, setviewportWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const handleResize = () => setviewportWidth(window.innerWidth);

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { viewportWidth };
};

export default useCurrentViewPort;
