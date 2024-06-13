'use client';
import React, { use, useState } from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import Modal from '@/components/ui/Modal';
import ScheduleInput from '@/components/admin/schedule/ScheduleInput';
import ScheduleVisualizer from '@/components/admin/schedule/ScheduleVisualizer';
import { getTeamSchedules } from '@/apis/schedule';
import { useQuery } from '@tanstack/react-query';

type scheduleType = {
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
  const [date, onChange] = useState(new Date());
  const [schedules, setSchedule] = useState<scheduleType[]>([]);
  const [dayList, setDayList] = useState(['2024-03-26', '2024-03-27']);
  //   const [showSchedule, setShowSchedule] = useState(false);
  console.log(schedules);
  // console.log(dayList);

  // 이부분 지금 정상작동 하지 않음. 수정 필요
  const { data } = useQuery({
    queryKey: ['teamSchedules'],
    queryFn: () => getTeamSchedules(3),
    select: (data) => data,
  });
  console.log(data);

  //임시 test 용
  const [times, setTimes] = useState<Time[]>([]);
  console.log('시간들 잘 들어오니?', times);

  const selectedDate = dayjs(date).format('YYYY년 M월 D일');

  // const dayList = ["2024-03-26", "2024-03-27"];

  const addContent = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];
    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === dayjs(date).format('YYYY-MM-DD'))) {
      contents.push(
        <>
          <div className='w-[20px] h-[20px] bg-yellow-300 rounded-full'>*</div>
        </>,
      );
    }

    return (
      <>
        <div>{contents}</div>
        <span
          onClick={() => {
            console.log('hi');
            setModalOpen(true);
          }}
          className='days-btn'
        >
          +
        </span>
      </>
    ); // 각 날짜마다 해당 요소가 들어감
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
        onChange={onChange}
        locale='ko'
        showNeighboringMonth={false}
        // onClickDay={clickDays}
      />
      <div>{dayjs(date).format('YY년-M월-D일')}</div>
      <div>
        {schedules?.map((schedule) => {
          console.log('여기', schedule);
          console.log(date);
          if (dayjs(date).format('YYYY-MM-DD') !== schedule.scheduleDate)
            return;
          return (
            <>
              {schedule ? (
                // <>
                //   {/* <h1>일정 날짜: {schedule.scheduleDate}</h1> */}

                //   <p>시작시간:{schedule.startTime}</p>

                //   <p>끝나는 시간:{schedule.endTime}</p>
                //   <br />
                //   <p>{schedule.content}</p>
                // </>
                <></>
              ) : null}
            </>
          );
        })}
        <ScheduleVisualizer schedules={times} />
      </div>
    </>
  );
};

export default CalendarPage;
