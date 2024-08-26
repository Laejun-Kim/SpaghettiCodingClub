'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import nbcIcon from '@/assets/images/spaghetti_logo.png';
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  registerUser,
  verifyRecommendEmail,
  verifyUserEmail,
} from '../../apis/auth';
import Swal from 'sweetalert2';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  selectedTrack: string;
  isAdmin: boolean;
  recommend: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const selectItems = [
    { value: '스프링 백엔드 엔지니어 양성과정 3회차' },
    { value: '프론트엔드 엔지니어 양성과정 3회차' },
  ];
  const [inputs, setInputs] = useState({
    track: '',
    isAdmin: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({ mode: 'onChange' });

  const watchName = watch('username');
  const watchEmail = watch('email');
  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  const watchRecommend = watch('recommend');

  const registerHandler: SubmitHandler<FormValues> = (formData) => {
    const {
      username,
      email,
      password,
      selectedTrack,
      confirmPassword,
      isAdmin,
      recommend,
    } = formData;

    const NewUser = {
      username,
      email,
      password,
      checkPassword: confirmPassword,
      track: inputs.track,
    };

    const NewAdminUser = {
      username,
      email,
      password,
      checkPassword: confirmPassword,
      recommendEmail: recommend,
    };

    console.log(NewUser);
    if (inputs.isAdmin) {
      console.log('관리자', inputs.isAdmin);
      registerUser(NewAdminUser);
      if (typeof window !== 'undefined') router.replace('/');
    } else {
      console.log('학생', inputs.isAdmin);
      registerUser(NewUser);
      if (typeof window !== 'undefined') router.replace('/');
    }
  };

  const inputHandler = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const inputCheckHandler = (e: any) => {
    console.log(inputs.isAdmin);
    setInputs({ ...inputs, [e.target.name]: e.target.checked });
  };

  const cancelRegister = () => {
    console.log('회원가입취소');
    if (typeof window !== 'undefined') router.replace('/');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <Image src={nbcIcon} alt='이미지' width={800} height={400} />
      </div>
      <form
        className='flex flex-col gap-2 justify-center pr-10 items-center w-[600px]'
        onSubmit={handleSubmit(registerHandler)}
      >
        <Input
          aria-label='이름'
          type='text'
          placeholder='name'
          {...register('username', {
            required: '이름을 입력하세요',
            pattern: {
              value: /^[가-힣a-zA-Z]*$/,
              message: '올바른 이름으로 입력해주세요',
            },
          })}
        />
        {errors.username && (
          <p className='text-red-500 text-xs text-center'>
            {errors.username.message}
          </p>
        )}
        <div className='flex w-full gap-1'>
          <Input
            aria-label='이메일'
            type='text'
            placeholder='email'
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 메일 형식이 아닙니다',
              },
            })}
          />
          <Button
            size='md'
            color='danger'
            onClick={async () => {
              const result = await verifyUserEmail(getValues('email'));
              console.log(result.message);
              Swal.fire({
                icon: 'success',
                title: '이메일이 발송되었습니다',
                html: `${result.message}. <br>
                이메일 인증 완료 후 회원가입을 진행해주세요`,
              });
            }}
          >
            인증하기
          </Button>
        </div>
        {errors.email && (
          <p className='text-red-500 text-xs text-center'>
            {errors.email.message}
          </p>
        )}
        <Input
          aria-label='비밀번호'
          type='password'
          placeholder='password'
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
              message: '비밀번호는 영문, 숫자 포함 최소 8자 이상 입력해주세요',
            },
          })}
        />
        {errors.password && (
          <p className='text-red-500 text-xs text-center'>
            {errors.password.message}
          </p>
        )}
        <Input
          aria-label='비밀번호 재확인'
          type='password'
          placeholder='confirmPassword'
          {...register('confirmPassword', {
            required: '비밀번호를 입력해주세요',
            validate: (value) => value === watchPassword,
          })}
        />
        {errors.confirmPassword && (
          <p className='text-red-500 text-xs text-center'>
            {errors.confirmPassword.message}
          </p>
        )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === 'validate' && (
            <p className='text-red-500 text-xs text-center'>
              비밀번호가 일치하지 않습니다
            </p>
          )}
        <Select
          aria-label='track'
          name='track'
          items={selectItems}
          placeholder='트랙을 선택하세요'
          onChange={inputHandler}
          value={inputs.track}
        >
          {(selectItem) => (
            <SelectItem key={selectItem.value}>{selectItem.value}</SelectItem>
          )}
        </Select>
        <div>
          <Checkbox
            id='adminCheck'
            name='isAdmin'
            checked={inputs.isAdmin}
            placeholder='adminCheck'
            onChange={inputCheckHandler}
          >
            관리자이신가요?
          </Checkbox>
        </div>
        <div className='flex w-full gap-1'>
          <Input
            aria-label='추천인 메일'
            type='text'
            placeholder='추천인 email'
            {...register('recommend', {
              // required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 메일 형식이 아닙니다',
              },
            })}
          />
          <Button
            size='md'
            color='danger'
            onClick={async () => {
              const result = await verifyRecommendEmail(
                getValues('email'),
                getValues('recommend'),
              );
              console.log(result);
              Swal.fire({
                icon: 'success',
                title: '이메일이 발송되었습니다',
                html: `${result.message}. <br>
                  추천인이 이메일 인증 후 회원가입 버튼을 누르세요.`,
              });
            }}
          >
            인증하기
          </Button>
        </div>
        {errors.recommend && (
          <p className='text-red-500 text-xs text-center'>
            {errors.recommend.message}
          </p>
        )}
        <div>
          {inputs.isAdmin ? (
            <Button
              type='submit'
              color='danger'
              className='mr-2'
              isDisabled={
                !watchName ||
                !watchEmail ||
                !watchPassword ||
                !watchConfirmPassword ||
                !watchRecommend
              }
            >
              회원가입
            </Button>
          ) : (
            <Button
              type='submit'
              color='danger'
              className='mr-2'
              isDisabled={
                !watchName ||
                !watchEmail ||
                !watchPassword ||
                !watchConfirmPassword ||
                !inputs.track
              }
            >
              회원가입
            </Button>
          )}

          <Button type='button' onClick={cancelRegister}>
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
