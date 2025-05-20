'use client';
import Input from '@/components/common/Input/Input';

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
const Page = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-write-write-main text-2xl font-bold">로그인</div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(() =>
          onSubmit({ email: 'test', password: 'test' })
        )}
      >
        <div>
          <label htmlFor="email">아이디</label>
          <Input
            name="email"
            placeholder="이메일을 입력해주세요."
            register={{ ...register('email') }}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>

          <Input
            suffixIcon={
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                보기
              </button>
            }
            name="password"
            type={isShowPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요."
            register={{ ...register('password') }}
          />
        </div>
        <button>로그인</button>
        <div>
          <span>같이 달램이 처음이신가요?</span>
          <Link href="/auths/signup">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
