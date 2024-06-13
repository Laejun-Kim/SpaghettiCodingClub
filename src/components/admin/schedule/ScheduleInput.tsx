import { createSchedule } from '@/apis/schedule';
import { Button, Input, Spacer, Textarea } from '@nextui-org/react';
import { create } from 'domain';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

interface Props {
  selectedDate: string;
  times: any;
  setTimes: React.Dispatch<React.SetStateAction<Time[]>>;
}
interface Time {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

const ScheduleInput = ({ selectedDate, setTimes }: Props) => {
  const [inputs, setInputs] = useState({
    content: '',
    startTime: '',
    endTime: '',
  });
  const { content, startTime, endTime } = inputs;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startTime > endTime) {
      Swal.fire('시간을 제대로 입력하세요');

      return;
    }

    function convertDateAndTime(dateString: string, timeString: string) {
      // 날짜 문자열을 ISO 형식으로 변환
      const [year, month, day] = dateString
        .split(' ')
        .map((str) => str.replace(/[^0-9]/g, ''));
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0',
      )}`;

      // 변환된 날짜와 시간 문자열을 결합
      const dateTime = dayjs(`${formattedDate} ${timeString}`).format(
        'YYYY-MM-DDTHH:mm:ss',
      );

      return dateTime;
    }

    const formattedStartTime = convertDateAndTime(selectedDate, startTime);
    const formattedEndTime = convertDateAndTime(selectedDate, endTime);

    createSchedule({
      title: inputs.content,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    });

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    console.log(content, startHour, startMinute, endHour, endMinute);
    console.log(content, typeof +startTime, typeof +endTime);

    setTimes((prev) => [
      ...prev,
      { startHour, startMinute, endHour, endMinute },
    ]);

    return { content, startHour, startMinute, endHour, endMinute };
  };

  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(inputs);
  return (
    <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
      <h1 className='font-bold text-2xl text-center'>{selectedDate}</h1>
      <Spacer y={10} />
      <div className='flex flex-col'>
        <label htmlFor='startTime'>시작시간</label>
        <input
          type='time'
          id='startTime'
          placeholder='Password'
          value={startTime}
          onChange={HandlerChange}
          name='startTime'
        />
        <Spacer y={4} />
        <label htmlFor='endTime'>끝나는 시간</label>
        <input
          type='time'
          id='endTime'
          placeholder='Password'
          value={endTime}
          onChange={HandlerChange}
          name='endTime'
        />
        <Spacer y={10} />
      </div>
      <Textarea
        type='text'
        id='content'
        maxLength={150}
        placeholder='content'
        value={content}
        onChange={HandlerChange}
        name='content'
      />
      <Spacer y={10} />
      <Button type='submit' color='danger'>
        저장
      </Button>
    </form>
  );
};

export default ScheduleInput;
