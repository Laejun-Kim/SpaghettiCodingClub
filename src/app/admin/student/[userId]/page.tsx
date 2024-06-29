'use client';
import { deleteAssessment } from '@/apis/assesment';
import { getUserData } from '@/apis/auth';
import { changeStudentName } from '@/apis/student';
import StudentComment from '@/components/admin/student/StudentComment';
import StudentTrackInfo from '@/components/admin/student/StudentTrackInfo';
import Modal from '@/components/ui/Modal';
import { useWIPToast } from '@/hooks/useToast';

import { Button, Divider, Spacer, user } from '@nextui-org/react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserId = () => {
  const queryClient = useQueryClient();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [isNameEditing, setIsNameEditing] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null); // ref 생성
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

  const { mutate: changeNameMutation } = useMutation({
    mutationFn: changeStudentName,
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

  const nameChangeHandler = async () => {
    if (newName === '' || newName.trim().length === 0) {
      toast.warning('이름을 제대로 입력해주세요.');
    } else {
      await changeNameMutation({ userId: +userId, username: newName });
      setIsNameEditing(false);
      toast.success('이름이 변경되었습니다.');
    }
  };

  const deleteAssessmentHandler = async (assessmentId: number) => {
    removeAssessmentMutation(assessmentId);
    setModalOpen(false);
    toast.success('로그가 삭제되었습니다.');
  };

  const handleEditNameClick = () => {
    setNewName(data.username);
    setIsNameEditing(true);
  };

  useEffect(() => {
    if (isNameEditing && nameRef.current) {
      nameRef.current.focus(); // input 요소에 포커스를 설정
    }
  }, [isNameEditing]);

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
      <h1 className='text-2xl font-bold '>
        {isNameEditing ? (
          <div>
            <input
              ref={nameRef}
              className='w-[150px]'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <span onClick={nameChangeHandler} className='cursor-pointer'>
              ✔
            </span>
          </div>
        ) : (
          <div>
            <span>{username}</span>
            <span className='cursor-pointer' onClick={handleEditNameClick}>
              ✏️
            </span>
          </div>
        )}
      </h1>
      <h3>{email}</h3>
      <Spacer y={2} />
      <StudentTrackInfo
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
      <Button color='danger' onClick={useWIPToast}>
        수강생 삭제
      </Button>
    </div>
  );
};

export default UserId;
