import { createScheduleData } from '@/types/types';
import axios from 'axios';

const token = sessionStorage.getItem('token');

// 새 일정 생성 API
export const createSchedule = async (reqData: createScheduleData) => {
  try {
    console.log(reqData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/schedules`,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json', // Add Content-Type header
          Authorization: `${token}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

// 팀 일정 전체 조회 API
export const getTeamSchedules = async (teamId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/schedules/teams/${teamId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

// 일정 기간 조회 API(특정 날짜 일정 조회)
export const getPeriodSchedules = async (
  teamId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/schedules/teams/${teamId}/date-range?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

// 일정 수정 API
export const updateSchedule = async (
  reqData: createScheduleData,
  scheduleId: number,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/schedules/${scheduleId}`,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json', // Add Content-Type header
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

// 일정 삭제 API
export const deleteSchedule = async (scheduleId: number) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/schedules/${scheduleId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};
