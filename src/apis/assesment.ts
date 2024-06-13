import axios from 'axios';
import { assessmentData } from '@/types/types';

const token = sessionStorage.getItem('token');

interface updateAssessmentProps {
  assessmentId: number | undefined;
  reqBody: assessmentData;
}

//평가 수정
export const updateAssessment = async ({
  assessmentId,
  reqBody,
}: updateAssessmentProps) => {
  console.log(assessmentId, reqBody);
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/assessmentItems/${assessmentId}`,
      reqBody,
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

//평가 생성
export const createAssessment = async (reqBody: assessmentData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/assessmentItems`,
      reqBody,
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

//평가 삭제
export const deleteAssessment = async (assessmentId: number | undefined) => {
  console.log('삭제함수 실행됨');
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/assessmentItems/${assessmentId}`,
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
