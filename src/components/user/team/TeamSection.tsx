'use client';

import { useWIPToast } from '@/hooks/useToast';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
} from '@nextui-org/react';
import { use, useState } from 'react';

const TeamSection = () => {
  const [dropDownState, setDropDownState] = useState(false);

  // const toggleHandler = () => setDropDownState((prev) => !prev);
  return (
    <section className='p-6 bg-slate-200 max-h-[300px] rounded-lg'>
      <header className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>팀원</h2>
        <div className='p-2 round-xl'>
          <Dropdown>
            <DropdownTrigger>
              <span onClick={useWIPToast} className='text-xl cursor-pointer'>
                👎
              </span>
            </DropdownTrigger>
            {!dropDownState ? (
              <DropdownMenu aria-label='Static Actions'>
                <DropdownItem key='김래준'>김래준</DropdownItem>
                <DropdownItem key='김은채'>김은채</DropdownItem>
                <DropdownItem key='김대영'>김대영</DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu aria-label='Static Actions'>
                <DropdownItem key='already'>
                  이미 비호감도 투표를 하셨습니다.
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </div>
      </header>
      <Spacer y={2} />
      <div className='flex gap-2'>
        <div className='p-4 rounded-md bg-slate-400 w-full h-[100px]'>
          <p className='font-bold'>김미희</p>
        </div>
        <div className='p-4 rounded-md bg-slate-400 w-full h-[100px]'>
          <p className='font-bold'>김래준</p>
        </div>
        <div className='p-4 rounded-md bg-slate-400 w-full h-[100px]'>
          <p className='font-bold'>김은채</p>
        </div>
        <div className='p-4 rounded-md bg-slate-400 w-full h-[100px]'>
          <p className='font-bold'>김대영</p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
