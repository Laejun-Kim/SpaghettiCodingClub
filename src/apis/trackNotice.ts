import axios from 'axios';
import {
  deleteNoticeData,
  newNoticeData,
  noticeUpdateData,
} from '@/types/types';

const token = sessionStorage.getItem('token');

interface createTrackProps {
  trackId: number;
  reqData: newNoticeData;
}

// 트랙공지 모두 가져오기
export const getTrackNotices = async (trackId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/notices`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 단일 트랙공지 가져오기 (공지상세)
export const getTrackNotice = async (trackId: number, noticeId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/notices/${noticeId}`,
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

// 새 공지 쓰기
export const createTrackNotice = async ({
  trackId,
  reqData,
}: createTrackProps) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/notices`,
      reqData,
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

// 공지 삭제
export const deleteTrackNotice = async ({
  trackId,
  noticeId,
}: deleteNoticeData) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/notices/${noticeId}`,

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

// 공지 수정
export const updateTrackNotice = async ({
  trackId,
  noticeId,
  noticeTitle,
  noticeContent,
}: noticeUpdateData) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/notices/${noticeId}`,
      { trackNoticeTitle: noticeTitle, trackNoticeContent: noticeContent },
      {
        headers: {
          'Content-Type': 'application/json',
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
