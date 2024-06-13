'use client';
import { createAssessment, updateAssessment } from '@/apis/assesment';
import { Textarea } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';

type Props = {
  title: string;
  content?: string;
  assessmentId?: number | undefined;
};

const StudentComment = ({ title, content, assessmentId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);
  const [mode, setMode] = useState('post');
  const param = useParams();
  const { userId } = param;

  const queryClient = useQueryClient();

  const { mutate: updateAssessmentMutation } = useMutation({
    mutationFn: updateAssessment,
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
  const { mutate: postAssessmentMutation } = useMutation({
    mutationFn: createAssessment,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'userData',
      ] as InvalidateQueryFilters);
    },
  });

  useEffect(() => {
    if (!!assessmentId) {
      setMode('patch');
    } else {
      setMode('post');
    }
  }, [assessmentId]);

  const getType = (title: string) => {
    switch (title) {
      case '배경':
        return 'background';
      case '학습':
        return 'guidance';
      case '관계':
        return 'relationship';
      default:
        return 'unknown';
    }
  };
  const type = getType(title);

  const patchReqBody = {
    [type]: text,
  };
  const postReqBody = {
    [type]: text,
    userId: +userId,
  };

  const isEdit = () => {
    setIsEditing((prev) => !prev);
    updateAssessmentMutation({ assessmentId, reqBody: patchReqBody });
  };
  const isCreate = () => {
    setIsEditing((prev) => !prev);
    postAssessmentMutation(postReqBody);
  };

  return (
    <>
      <div>
        <div className='flex mb-4 font-bold'>
          <h3 className='mr-1'>{title}</h3>
          <span
            onClick={mode === 'patch' ? isEdit : isCreate}
            className='cursor-pointer'
          >
            {isEditing ? '✔' : '✏️'}
          </span>
        </div>
      </div>
      <div>
        <Textarea
          placeholder='내용을 입력하세요'
          value={text}
          isDisabled={!isEditing}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </>
  );
};

export default StudentComment;
