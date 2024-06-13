import Image from 'next/image';
import React from 'react';
import githublogo from '@/assets/images/github.png';
import { Divider, Spacer } from '@nextui-org/react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center py-2 bg-slate-300'>
      <span>Spaghetti Coding Club. All rights reserved.</span>
      <Spacer y={2} />
      <div className='flex'>
        <div className='flex gap-1 mx-3'>
          <Image src={githublogo} alt='github' width={24} height={20} />
          <Link target='_blank' href='https://github.com/EUNCHAEv1006'>
            김은채
          </Link>
        </div>
        <Divider orientation='vertical' />
        <div className='flex gap-1 mx-3'>
          <Image src={githublogo} alt='github' width={24} height={20} />
          <Link target='_blank' href='https://github.com/kdy9960'>
            김대영
          </Link>
        </div>
        <Divider orientation='vertical' />

        <div className='flex gap-1 mx-3'>
          <Image src={githublogo} alt='github' width={24} height={20} />
          <Link target='_blank' href='https://github.com/mi-hee-k'>
            김미희
          </Link>
        </div>
        <Divider orientation='vertical' />

        <div className='flex gap-1 mx-3'>
          <Image src={githublogo} alt='github' width={24} height={20} />
          <Link target='_blank' href='https://github.com/Laejun-Kim'>
            김래준
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
