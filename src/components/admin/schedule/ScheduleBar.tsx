'use client';
import React from 'react';

interface Props {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

const ScheduleBar = ({ startHour, startMinute, endHour, endMinute }: Props) => {
  function formatTime(hour: number, minute: number) {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  }

  // function parseTime(time) {
  //   const [hour, minute] = time.split(':').map(Number);
  //   return [hour, minute];
  // }

  function setTimeRange(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ): { startPercent: number; rangeWidth: number } {
    // const [startHour, startMinute] = parseTime(startTime);
    // const [endHour, endMinute] = parseTime(endTime);

    // Validation
    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = endHour * 60 + endMinute;
    // if (
    //   totalStartMinutes < 0 ||
    //   totalStartMinutes >= 1440 ||
    //   totalEndMinutes <= 0 ||
    //   totalEndMinutes > 1440 ||
    //   totalStartMinutes >= totalEndMinutes
    // ) {
    //   console.error('Invalid time range');
    //   return;
    // }

    const startPercent = (totalStartMinutes / 1440) * 100;
    const endPercent = (totalEndMinutes / 1440) * 100;
    const rangeWidth = endPercent - startPercent;
    return { startPercent, rangeWidth };
  }

  // Example usage
  const { startPercent, rangeWidth } = setTimeRange(
    // `${startHour}:${startMinute}`,
    // `${endHour}:${endMinute}`
    startHour,
    startMinute,
    endHour,
    endMinute
  );

  return (
    <div className='w-full h-[50px] border-cyan-900 border-1 bg-slate-100 relative mb-7'>
      <div
        className={`absolute h-full bg-green-400 z-[1]`}
        style={{ width: `${rangeWidth}%`, left: `${startPercent}%` }}
      ></div>
      <span
        className='absolute top-[100%] translate-y-[5px] text-[12px] z-[2]'
        style={{ left: `${startPercent}%` }}
      >
        {formatTime(startHour, startMinute)}
      </span>
      <span
        className='absolute top-[100%] translate-y-[5px] text-[12px] z-[2]'
        style={{ left: `${startPercent + rangeWidth}%` }}
      >
        {formatTime(endHour, endMinute)}
      </span>
    </div>
  );
};

export default ScheduleBar;
