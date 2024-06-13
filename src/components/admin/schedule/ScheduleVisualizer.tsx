import React from 'react';
import ScheduleBar from './ScheduleBar';
import Image from 'next/image';
import ruler from '@/assets/images/123.png';

interface Time {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}
interface Props {
  schedules: Time[];
}

const ScheduleVisualizer = ({ schedules }: Props) => {
  return (
    <div className='w-[650px]'>
      {schedules.map((schedule, idx) => (
        <ScheduleBar
          key={idx}
          startHour={schedule.startHour}
          startMinute={schedule.startMinute}
          endHour={schedule.endHour}
          endMinute={schedule.endMinute}
        />
      ))}
      {/* <Image src={ruler} /> */}
    </div>
  );
};

export default ScheduleVisualizer;
