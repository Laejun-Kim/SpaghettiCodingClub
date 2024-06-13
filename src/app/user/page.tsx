'use client';
import { getTracks } from '@/apis/track';
import { useUserStore } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import NoticeSection from '@/components/user/notice/NoticeSection';
import TeamSection from '@/components/user/team/TeamSection';
import { Spacer } from '@nextui-org/react';

const UserPage = () => {
  const { track } = useUserStore();
  console.log(track);

  return (
    <div>
      <NoticeSection />
      <Spacer y={6} />
      <TeamSection />
    </div>
  );
};

export default UserPage;
