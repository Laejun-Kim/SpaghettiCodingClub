import { changeTrackData } from '@/types/types';
import axios from 'axios';

// 트랙 참여자 전체 조회
export const getStudents = async (trackId: number) => {
  try {
    const token =
      typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trackParticipants/${trackId}`,
      {
        headers: {
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

// student 트랙 변경
export const changeTrack = async ({
  userId,
  oldTrackId,
  newTrackId,
}: changeTrackData) => {
  console.log(userId, oldTrackId);
  try {
    const token =
      typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trackParticipants/${userId}/${oldTrackId}`,
      { newTrackId },
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

interface changeStudentNameData {
  userId: number;
  username: string;
}
// 수강생 이름 변경
export const changeStudentName = async ({
  userId,
  username,
}: changeStudentNameData) => {
  try {
    const token =
      typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}/username`,
      { username },
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
