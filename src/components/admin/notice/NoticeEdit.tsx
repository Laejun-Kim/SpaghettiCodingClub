'use client';
import { updateTrackNotice } from '@/apis/trackNotice';
import { noticeData } from '@/types/types';
import { Button, Input, Spacer, Textarea } from '@nextui-org/react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import React, { useState } from 'react';

interface NoticeEditProps {
  notice: noticeData;
  editDispatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoticeEdit = ({ notice, editDispatch }: NoticeEditProps) => {
  const { trackNoticeTitle, trackNoticeContent, noticeId, trackId, userId } =
    notice;
  console.log(notice);

  const [title, setTitle] = useState(trackNoticeTitle);
  const [content, setContent] = useState(trackNoticeContent);
  const queryClient = useQueryClient();

  const { mutate: updateNoticeMutation } = useMutation({
    mutationFn: updateTrackNotice,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'trackNotice',
        noticeId,
      ] as InvalidateQueryFilters);
    },
  });

  const editHandler = () => {
    updateNoticeMutation({
      trackId,
      noticeId,
      noticeTitle: title,
      noticeContent: content,
    });
    editDispatch(() => {
      return false;
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <Input
        type='text'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Spacer y={5} />
      <Textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Spacer y={5} />
      <Button onClick={editHandler} className='ml-auto'>
        수정 완료
      </Button>
    </div>
  );
};

export default NoticeEdit;
