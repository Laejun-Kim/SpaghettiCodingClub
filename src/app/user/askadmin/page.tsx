import React from 'react';
import warningImg from '@/assets/images/warning.webp';
import Image from 'next/image';
import { Spacer } from '@nextui-org/react';

const AskAdmin = () => {
  return (
    <div className='flex flex-col w-full h-full justify-center items-center '>
      <Image src={warningImg} alt='warning' width={150} height={150} />
      <Spacer y={2} />
      <h1 className='text-3xl'>권한이 없는 접근입니다.</h1>
      <Spacer y={1} />
      <p>관리자에게 문의하세요.</p>
    </div>
  );
};

export default AskAdmin;
