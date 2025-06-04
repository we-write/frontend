'use client';
import { getMyInfo } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useGetMyInfo = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('isSignIn') === 'true') {
      setIsSignIn(true);
    }
  }, []);

  return useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    enabled: isSignIn,
  });
};
