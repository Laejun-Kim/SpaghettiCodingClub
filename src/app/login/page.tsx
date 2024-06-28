'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import nbcIcon from '@/assets/images/spaghetti_logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '../../apis/auth';
import { useAuthStore, useUserStore } from '@/zustand/store';
import { useQueryClient } from '@tanstack/react-query';

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();
  // const { setRole } = useRoleStore();
  const { setTrack } = useUserStore();
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey: ['loggedInUser'] });

  // const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const loginHandler: SubmitHandler<FormValues> = async (formData) => {
    const { email, password } = formData;
    const result = await login({ email, password });
    // loginMutation({ email, password });
    setIsLoggedIn(true);
    // setRole(result.payload.role);
    setTrack(result.payload.track);
    if (typeof window !== 'undefined') {
      router.push('/redirect');
    }
  };

  return (
    <div className='flex h-[100vh] items-center justify-center p-auto'>
      <div className='flex items-center'>
        <div className=''>
          <Image src={nbcIcon} alt='nbc icon' width={600} height={300} />
        </div>
        <div>
          <form
            onSubmit={handleSubmit(loginHandler)}
            className='flex flex-col pr-10 gap-2'
          >
            <Input
              type='string'
              placeholder='이메일을 입력하세요'
              {...register('email', {
                required: '이메일을 입력하세요',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '올바른 메일 형식이 아닙니다',
                },
              })}
            />
            {errors.email && (
              <p className='text-red-500 text-xs text-center'>
                {errors.email.message}
              </p>
            )}
            <Input
              type='password'
              placeholder='비밀번호를 입력하세요'
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                // pattern: {
                //   value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                //   message: '비밀번호는 영문, 숫자 포함 8자 이상 입니다.',
                // },
              })}
            />
            {errors.password && (
              <p className='text-red-500 text-xs text-center'>
                {errors.password.message}
              </p>
            )}
            <Spacer />
            <div className='flex gap-2 justify-between'>
              <Button
                type='submit'
                color='danger'
                isDisabled={!watchEmail || !watchPassword}
              >
                로그인 test
              </Button>
              <Link href='/register'>
                <Button>회원가입</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
