'use client';

import toast from '@/utils/toast';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const ClientSideHandler = () => {
  useEffect(() => {
    const errorType = Cookies.get('redirect_error');

    if (errorType === 'invalid_route') {
      setTimeout(() => {
        toast({
          type: 'error',
          message: '잘못된 접근입니다.',
          duration: 4,
        });
      }, 0);
      Cookies.remove('redirect_error');
    }
  }, []);

  return null;
};

export default ClientSideHandler;
