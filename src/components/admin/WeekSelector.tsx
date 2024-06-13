'use client';

import { getTrackWeeks } from '@/apis/trackWeek';
import { tracksWeekInfo } from '@/types/types';
import { useTrackStore } from '@/zustand/store';
import { Select, SelectItem } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

const WeekSelector = () => {
  const { setTrackWeek, selectedTrackWeek, selectedTrack } = useTrackStore(
    (state) => state,
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allTrackWeeks'],
    queryFn: () => getTrackWeeks(selectedTrack?.trackId!),
    enabled: !!selectedTrack,
  });

  useEffect(() => {
    refetch();
  }, [selectedTrack, refetch]);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <Select
      placeholder='주차선택'
      aria-label='week-selector'
      onChange={(e) => {
        console.log('여기', e.target.value);
        let targetName = e.target.value;
        const result = data.payload.find(
          (trackWeek: tracksWeekInfo) => trackWeek.weekName === targetName,
        );
        console.log(result);

        setTrackWeek(result);
      }}
      selectedKeys={[selectedTrackWeek!.weekName]}
    >
      {data.payload.map((trackWeek: tracksWeekInfo) => (
        <SelectItem key={trackWeek.weekName}>{trackWeek.weekName}</SelectItem>
      ))}
    </Select>
  );
};

export default WeekSelector;
