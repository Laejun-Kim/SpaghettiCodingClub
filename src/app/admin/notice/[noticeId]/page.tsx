'use client';

import { deleteTrackNotice, getTrackNotice } from '@/apis/trackNotice';
import NoticeEdit from '@/components/admin/notice/NoticeEdit';
import { useTrackStore } from '@/zustand/store';
import { Button, Spacer } from '@nextui-org/react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const NoticeDetailPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { selectedTrack } = useTrackStore((state) => state);
  const params = useParams();
  const router = useRouter();
  const { noticeId } = params;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trackNotice'],
    queryFn: () => getTrackNotice(selectedTrack!.trackId, +noticeId),
    enabled: !!noticeId,
    select: (data) => data.payload,
  });
  console.log(data);

  const { mutate: removeNoticeMutation } = useMutation({
    mutationFn: deleteTrackNotice,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'trackNotice',
      ] as InvalidateQueryFilters);
      router.replace('/admin/notice');
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || '에러가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    refetch();
  }, [noticeId, refetch]);

  if (isLoading) {
    return <>로딩중</>;
  }

  const removeNotice = (trackId: number, noticeId: number) => {
    removeNoticeMutation({ trackId, noticeId });
  };

  return (
    <div>
      {isEditing ? (
        <NoticeEdit notice={data} editDispatch={setIsEditing} />
      ) : (
        <div>
          <h1 className='text-2xl font-bold'>{data.trackNoticeTitle}</h1>
          <Spacer y={2} />
          <p className='whitespace-pre-line'>{data.trackNoticeContent}</p>
          <Button
            onClick={() => {
              setIsEditing((prev) => !prev);
            }}
          >
            수정
          </Button>
          <Button
            onClick={() => removeNotice(selectedTrack!.trackId, +noticeId)}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default NoticeDetailPage;
