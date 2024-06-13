'use client';

import { Button, Spacer } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import PlusButton from '@/components/ui/PlusButton';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createTrack, getTracks, updateTrack } from '@/apis/track';
import { tracksInfo } from '@/types/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { toast } from 'react-toastify';

const TrackManage = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [trackTitle, setTrackTitle] = useState('');
  const [searchTrackName, setSearchTrackName] = useState('');
  const [editTrackId, setEditTrackId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['track'],
    queryFn: getTracks,
    select: (data) => data.payload,
  });

  const { mutate: newTrack } = useMutation({
    mutationFn: createTrack,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'track',
        trackTitle,
      ] as InvalidateQueryFilters);
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || '에러가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    },
  });

  const { mutate: editTrack } = useMutation({
    mutationFn: updateTrack,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'track',
        trackTitle,
      ] as InvalidateQueryFilters);
    },
  });

  const trackEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTrackId !== null) {
      editTrack({ trackId: editTrackId, reqData: trackTitle });
    }
    setModalOpen(false);
  };

  if (isLoading) {
    return <>로딩중</>;
  }

  const openModal = (
    mode: 'create' | 'edit',
    trackId?: number,
    trackName?: string,
  ) => {
    setModalMode(mode);
    if (mode === 'edit' && trackId && trackName) {
      setEditTrackId(trackId);
      setTrackTitle(trackName);
    } else {
      setTrackTitle('');
    }
    setModalOpen(true);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackTitle(e.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (trackTitle.trim() === '') {
      toast.warn('트랙 이름을 입력해 주세요.');
      return;
    }

    newTrack(trackTitle);
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <Modal
          setIsOpen={setModalOpen}
          title={modalMode === 'create' ? '트랙생성' : '트랙수정'}
        >
          <form
            onSubmit={modalMode === 'create' ? submitHandler : trackEditHandler}
          >
            <input
              type='text'
              placeholder='트랙명을 입력하세요'
              value={trackTitle}
              onChange={(e) => changeHandler(e)}
            />
            <button>저장</button>
          </form>
        </Modal>
      )}
      <form className='flex'>
        <Input
          type='text'
          placeholder='트랙명 검색'
          value={searchTrackName}
          onChange={(e) => setSearchTrackName(e.target.value)}
        />
        {/* <Button color='danger'>검색</Button> */}
      </form>
      <Spacer y={2} />
      <div>
        {data
          .filter((track: tracksInfo) =>
            track.trackName
              .toLowerCase()
              .includes(searchTrackName.toLowerCase()),
          )
          .map((track: tracksInfo) => {
            return (
              <div className='flex' key={track.trackId}>
                <div>{track.trackName}</div>
                <span
                  className='cursor-pointer'
                  onClick={() =>
                    openModal('edit', track.trackId, track.trackName)
                  }
                >
                  ✏️
                </span>
              </div>
            );
          })}
        <Spacer y={10} />
        <PlusButton onClick={() => openModal('create')} />
      </div>
    </div>
  );
};

export default TrackManage;
