import { noticeData } from '@/types/types';
import { Spacer } from '@nextui-org/react';
import Link from 'next/link';

interface Props {
  notices: noticeData[] | undefined;
}

const NoticeSection = ({ notices }: Props) => {
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
        {notices?.map((notice) => (
          <div className='flex justify-between' key={notice.noticeId}>
            <Link href={`/user/notice/${notice.noticeId}`}>
              <p className='font-bold'>{notice.trackNoticeTitle}</p>
            </Link>
            {/* <span className='text-slate-700'>{notice.trackNoticeDate}</span> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoticeSection;
