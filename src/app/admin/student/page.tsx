'use client';
import { Button, Spacer } from '@nextui-org/react';
import { getStudents } from '@/apis/student';
import React, { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import TrackSelector from '@/components/admin/TrackSelector';
import { useTrackStore } from '@/zustand/store';
import { personData } from '@/types/types';
import Link from 'next/link';

const Student = () => {
  const { selectedTrack } = useTrackStore((state) => state);
  const [searchStudent, setSearchStudent] = useState('');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allStudent'],
    queryFn: () => getStudents(selectedTrack!.trackId),
    enabled: !!selectedTrack,
    select: (data) => data.payload,
  });

  if (isLoading) {
    return <>로딩중</>;
  }

  // console.log(data.payload);

  return (
    <div>
      <div className='flex gap-2'>
        <TrackSelector />
        <Button onClick={() => refetch()}>조회</Button>
      </div>
      <Spacer y={2} />
      <input
        type='text'
        placeholder='수강생 검색'
        value={searchStudent}
        onChange={(e) => setSearchStudent(e.target.value)}
        className='w-full'
      />
      <Spacer y={2} />
      <ul>
        {data
          .filter((person: personData) =>
            person.userName.toLowerCase().includes(searchStudent.toLowerCase()),
          )
          .map((person: personData) => (
            <li key={person.userId}>
              <Link href={`/admin/student/${person.userId}`}>
                {person.userName}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Student;
