'use client';
import { createTrackNotice } from '@/apis/trackNotice';
import TrackSelector from '@/components/admin/TrackSelector';
import { useTrackStore } from '@/zustand/store';
import { Input, Spacer, Textarea, Button, Divider } from '@nextui-org/react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Notice {
  trackNoticeTitle: string;
  trackNoticeContent: string;
}

const NoticeWritePage = () => {
  const queryClient = useQueryClient();
  const { selectedTrack } = useTrackStore((state) => state);
  const router = useRouter();
  const [notice, setNotice] = useState<Notice>({
    trackNoticeTitle: '',
    trackNoticeContent: '',
  });

  const { mutate: newNoticeMutation } = useMutation({
    mutationFn: createTrackNotice,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'trackNotice',
      ] as InvalidateQueryFilters);
      if (typeof window !== 'undefined') {
        router.replace('/admin/notice');
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || '에러가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    },
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newNoticeMutation({ trackId: selectedTrack!.trackId, reqData: notice });
  };

  const cancelHandler = () => {
    router.back();
  };

  return (
    <section>
      <h1 className='text-3xl text-center font-bold'>공지 작성</h1>
      <Spacer y={10} />
      <form onSubmit={submitHandler}>
        <TrackSelector />
        <Spacer y={4} />
        <Divider />
        <Spacer y={4} />
        <div>
          <Input
            type='text'
            name='trackNoticeTitle'
            label='Title'
            aria-label='Title'
            placeholder='제목을 입력하세요'
            labelPlacement='outside'
            onChange={changeHandler}
            value={notice?.trackNoticeTitle}
          />
        </div>

        <Spacer y={4} />
        <Textarea
          name='trackNoticeContent'
          label='Content'
          aria-label='Content'
          placeholder='내용을 입력하세요'
          minRows={10}
          labelPlacement='outside'
          value={notice?.trackNoticeContent}
          onChange={changeHandler}
        />

        <Spacer y={6} />
        <div className='text-right'>
          <Button className='mr-2' type='button' onClick={cancelHandler}>
            돌아가기
          </Button>
          <Button color='danger' type='submit'>
            글쓰기
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NoticeWritePage;
