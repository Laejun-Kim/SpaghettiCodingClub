'use client';
import { useState } from 'react';
import TrackSelector from '../TrackSelector';
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { changeTrack } from '@/apis/student';
import { useParams } from 'next/navigation';
import { useTrackStore } from '@/zustand/store';
import { toast } from 'react-toastify';

interface Props {
  trackName: string;
  trackWeeks: string;
  trackId: number;
}

const StudentTrackInfo = ({ trackName, trackWeeks, trackId }: Props) => {
  const queryClient = useQueryClient();
  const param = useParams();
  const { userId } = param;
  const [isTrackEditing, setIsTrackEditing] = useState(false);
  const { selectedTrack } = useTrackStore((state) => state);

  const { mutate: updateTrackMutation } = useMutation({
    mutationFn: changeTrack,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'userData',
      ] as InvalidateQueryFilters);
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || '에러가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    },
  });

  return (
    <>
      <div className='flex mb-4 font-bold'>
        {isTrackEditing ? <TrackSelector /> : <span>{trackName}</span>}
        <span
          onClick={() => {
            setIsTrackEditing((prev) => !prev);
          }}
          className='text-2xl ml-2 cursor-pointer'
        >
          {isTrackEditing ? (
            <span
              onClick={() =>
                updateTrackMutation({
                  userId: +userId,
                  oldTrackId: trackId,
                  newTrackId: selectedTrack!.trackId,
                })
              }
            >
              ✔
            </span>
          ) : (
            <span>✏️</span>
          )}
        </span>
      </div>
      <div className='flex flex-col'>
        {/* 이부분 trackweek api 완료되면 추가할것. 사용자가 참여해온 trackweek 목록+팀을 보여줄것. */}
        {/* {trackWeeks?.map((item) => (
          <p key={item.trackWeekId}>{item.weekName}</p>
        ))} */}
      </div>
    </>
  );
};

export default StudentTrackInfo;
