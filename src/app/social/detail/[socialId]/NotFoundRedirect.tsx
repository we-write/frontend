'use client';

import { useEffect, useRef } from 'react';
import { redirect } from 'next/navigation';

const NotFoundRedirect = () => {
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      alert('존재하지 않는 모임입니다.');
      redirect('/');
    }
  }, []);

  return null;
};

export default NotFoundRedirect;
