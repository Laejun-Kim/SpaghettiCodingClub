'use client';
import { deleteAssessment } from '@/apis/assesment';
import { getUserData } from '@/apis/auth';
import StudentComment from '@/components/admin/student/StudentComment';
import StudentInfo from '@/components/admin/student/StudentInfo';
import Modal from '@/components/ui/Modal';

import { Button, Divider, Spacer } from '@nextui-org/react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const UserId = () => {
  const queryClient = useQueryClient();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { userId } = param;

  const { data, isLoading } = useQuery({
    queryKey: ['userData', userId],
    queryFn: () => getUserData(+userId),
    select: (data) => data.payload,
    enabled: !!userId,
  });

  const { mutate: removeAssessmentMutation } = useMutation({
    mutationFn: deleteAssessment,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'trackNotice',
      ] as InvalidateQueryFilters);
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || '에러가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    },
  });

  const deleteAssessmentHandler = async (assessmentId: number) => {
    removeAssessmentMutation(assessmentId);
    setModalOpen(false);
    toast.success('로그가 삭제되었습니다.');
  };

  console.log(data);

  if (isLoading) {
    return <p>데이터 불러오는중...</p>;
  }

  if (!data) {
    return <p>데이터가 없습니다.</p>;
  }

  const { trackName, email, role, trackId, trackWeeks, username, assessment } =
    data;

  return (
    <div>
      {modalOpen && (
        <Modal title='로그삭제' setIsOpen={setModalOpen}>
          <p>학습/배경/관계 모든 로그가 삭제됩니다.</p>
          <p> 이 작업은 돌이킬 수 없습니다.</p>
          <Spacer y={2} />
          <div className='flex gap-2'>
            <Button
              color='danger'
              onClick={() => deleteAssessmentHandler(assessment.assessmentId)}
            >
              삭제
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              취소
            </Button>
          </div>
        </Modal>
      )}
      <h1 className='text-2xl font-bold mb-4'>{username}</h1>
      <StudentInfo
        trackName={trackName}
        trackWeeks={trackWeeks}
        trackId={trackId}
      />
      <Divider className='my-6' />
      {assessment ? (
        <>
          <div className='flex justify-end'>
            <Button size='sm' onClick={() => setModalOpen(true)}>
              로그삭제
            </Button>
          </div>
          <StudentComment
            title={'학습'}
            assessmentId={assessment.assessmentId}
            content={assessment.guidance || ''}
          />
          <Divider className='my-6' />
          <StudentComment
            title={'배경'}
            assessmentId={assessment.assessmentId}
            content={assessment.background || ''}
          />
          <Divider className='my-6' />
          <StudentComment
            title={'관계'}
            assessmentId={assessment.assessmentId}
            content={assessment.relationship || ''}
          />
        </>
      ) : (
        <>
          <StudentComment title={'학습'} />
          <Divider className='my-6' />
          <StudentComment title={'배경'} />
          <Divider className='my-6' />
          <StudentComment title={'관계'} />
        </>
      )}

      <Divider className='my-6' />
      <Button color='danger'>수강생 삭제</Button>
    </div>
  );
};

export default UserId;
