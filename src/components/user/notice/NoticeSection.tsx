import { Spacer } from '@nextui-org/react';
import Link from 'next/link';

const NoticeSection = () => {
  return (
    <section className='p-6 bg-slate-200 h-[250px] rounded-lg'>
      <header className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>트랙 공지사항</h2>
        <div className='p-2 round-xl'>
          <Link href='/user/notice'>
            <span className='text-xl cursor-pointer'>+</span>
          </Link>
        </div>
      </header>
      <Spacer y={2} />
      <div className='px-4'>
        <div className='flex justify-between'>
          <p className='font-bold'>공지사항1입니다.</p>
          <span className='text-slate-700'>2024-06-11</span>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>공지사항2입니다.</p>
          <span className='text-slate-700'>2024-06-11</span>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>공지사항3입니다.</p>
          <span className='text-slate-700'>2024-06-11</span>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>공지사항4입니다.</p>
          <span className='text-slate-700'>2024-06-11</span>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>공지사항5입니다.</p>
          <span className='text-slate-700'>2024-06-11</span>
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;
