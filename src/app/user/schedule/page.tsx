'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import Modal from '@/components/ui/Modal';
import ScheduleInput from '@/components/admin/schedule/ScheduleInput';
import ScheduleVisualizer from '@/components/admin/schedule/ScheduleVisualizer';

type ScheduleType = {
  content: string;
  startTime: string;
  endTime: string;
  scheduleDate: string;
};

interface Time {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

const CalendarPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [dayList, setDayList] = useState(['2024-03-26', '2024-03-27']);
  const [times, setTimes] = useState<Time[]>([]);

  const selectedDate = date ? dayjs(date).format('YYYY년 M월 D일') : '';

  const addContent = ({ date }: any) => {
    const contents = [];
    if (dayList.find((day) => day === dayjs(date).format('YYYY-MM-DD'))) {
      contents.push(
        <div
          key={dayjs(date).format('YYYY-MM-DD')}
          className='w-[20px] h-[20px] bg-yellow-300 rounded-full'
        >
          *
        </div>,
      );
    }

    return (
      <>
        <div>{contents}</div>
        <span onClick={() => setModalOpen(true)} className='days-btn'>
          +
        </span>
      </>
    );
  };

  const handleDateChange = (value: Date | Date[]) => {
    // value가 배열인 경우 첫 번째 요소를 사용
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal setIsOpen={setModalOpen} title={'일정추가'}>
          <ScheduleInput
            selectedDate={selectedDate}
            times={times}
            setTimes={setTimes}
          />
        </Modal>
      )}
      <Calendar
        value={date}
        formatDay={(locale, date) => dayjs(date).format('D')}
        tileContent={addContent}
        onChange={handleDateChange as any}
        locale='ko'
        showNeighboringMonth={false}
      />
      <div>{date ? dayjs(date).format('YY년-M월-D일') : ''}</div>
      <div>
        {schedules.map((schedule) => {
          if (
            date &&
            dayjs(date).format('YYYY-MM-DD') !== schedule.scheduleDate
          )
            return null;
          return (
            <div key={schedule.scheduleDate}>
              {schedule && (
                <>
                  <p>시작시간: {schedule.startTime}</p>
                  <p>끝나는 시간: {schedule.endTime}</p>
                  <br />
                  <p>{schedule.content}</p>
                </>
              )}
            </div>
          );
        })}
        <ScheduleVisualizer schedules={times} />
      </div>
    </>
  );
};

export default CalendarPage;
