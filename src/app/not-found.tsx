import { Button, Spacer } from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';
//지금 이 위치는 app 폴더 내에 위치하니 글로벌 레벨인거고
//특정 페이지에서만 작동하게 하고 싶으면 그 폴더 내에 넣으면 된다

const NotFound = () => {
  return (
    <main
      className='not-found h-screen flex flex-col justify-center items-center
    '
    >
      <h1 className='text-9xl'>404</h1>
      <Spacer y={2} />
      <p>페이지를 찾을 수 없습니다.</p>
      <Spacer y={2} />
      <Link href='/'>
        <Button color='danger' size='md'>
          Back to Home
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;
