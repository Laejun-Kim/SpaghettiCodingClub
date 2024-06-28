'use client';
import { updatePassword } from '@/apis/auth';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useTime } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface UpdatePasswordProps {
  userId: number;
  setmodal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePassword = ({ userId, setmodal }: UpdatePasswordProps) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkUpdatePassword, setConfirmPassword] = useState('');

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== checkUpdatePassword) {
      toast.warn('비밀번호가 일치하지 않습니다.');
      return;
    }

    let result;
    try {
      result = await updatePassword(
        userId,
        password,
        newPassword,
        checkUpdatePassword,
      );
    } catch (error: any) {
      console.log(error);
      toast.warn(error.message);
      return; // 에러가 발생하면 함수를 종료합니다.
    }

    // 성공했을 때 수행할 로직은 catch 블록 밖에서 처리합니다.
    toast.success('비밀번호가 변경되었습니다.');
    setmodal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='currentPassword'>Current Password:</label>
          <Input
            type='password'
            id='currentPassword'
            value={password}
            onChange={handleCurrentPasswordChange}
          />
        </div>
        <div>
          <label htmlFor='newPassword'>New Password:</label>
          <Input
            type='password'
            id='newPassword'
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <Input
            type='password'
            id='confirmPassword'
            value={checkUpdatePassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <Spacer y={2} />
        <Button type='submit'>비밀번호 변경</Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
