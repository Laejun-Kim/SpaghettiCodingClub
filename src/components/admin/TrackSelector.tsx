'use client';
import { getTracks } from '@/apis/track';
import { useTrackStore } from '@/zustand/store';
import { Select, SelectItem } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface Track {
  trackId: number;
  trackName: string;
}

const TrackSelector = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allTracks'],
    queryFn: getTracks,
  });

  const { setTrack, selectedTrack } = useTrackStore((state) => state);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  // console.log(data.payload);

  return (
    <Select
      placeholder='트랙선택'
      aria-label='track-selector'
      onChange={(e) => {
        console.log('여기', e.target.value);
        let targetName = e.target.value;
        const result = data.payload.find(
          (track: Track) => track.trackName === targetName,
        );
        console.log(result);

        setTrack(result);
      }}
      selectedKeys={[selectedTrack!.trackName]}
    >
      {data.payload.map((track: Track) => (
        <SelectItem key={track.trackName}>{track.trackName}</SelectItem>
      ))}
    </Select>
  );
};

export default TrackSelector;
