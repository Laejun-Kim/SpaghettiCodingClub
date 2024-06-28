'use client';
import { useUserStore } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import NoticeSection from '@/components/user/notice/NoticeSection';
import TeamSection from '@/components/user/team/TeamSection';
import { Spacer } from '@nextui-org/react';
import { getLoggedInUserData } from '@/apis/auth';
import { currentUserData, noticeData } from '@/types/types';
import SpinnerModal from '@/components/ui/SpinnerModal';
import { getTrackNotices } from '@/apis/trackNotice';

const UserPage = () => {
  const { track } = useUserStore();
  console.log(track);

  const { data: loggedInUser } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data) => data.payload as currentUserData,
    staleTime: 0,
  });

  const { data: trackNotices } = useQuery({
    queryKey: ['trackNotices'],
    queryFn: () => getTrackNotices(loggedInUser!.trackId),
    enabled: !!loggedInUser,
    select: (data) => data.payload as noticeData[],
  });
  console.log('트랙공지들', trackNotices);

  if (!loggedInUser) {
    return (
      <div>
        <SpinnerModal message='유저 정보를 불러오는 중' />
      </div>
    );
  }

  return (
    <div>
      <NoticeSection notices={trackNotices} />
      <Spacer y={6} />
      <TeamSection />
    </div>
  );
};

export default UserPage;
