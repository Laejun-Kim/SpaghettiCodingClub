import { changeTrackData } from '@/types/types';
import axios from 'axios';

const token =
  typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
// 트랙 참여자 전체 조회
export const getStudents = async (trackId: number) => {
  console.log(token);
  try {
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
