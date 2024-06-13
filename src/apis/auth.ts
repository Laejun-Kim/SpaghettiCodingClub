import axios from 'axios';
import { registerReqData, loginReqData } from '@/types/types';

const token =
  typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

// 로그인
export const login = async (reqData: loginReqData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auths/login`,
      reqData,
    );
    console.log(response);
    sessionStorage.setItem('token', response.headers.authorization);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

// 로그아웃
export const logout = async () => {
  sessionStorage.removeItem('token');
};

// 회원가입
export const registerUser = async (reqData: registerReqData) => {
  console.log('회원가입 펑션 호출됨');
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auths/signup`,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json', // Add Content-Type header
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

// 유저 정보 조회
export const getUserData = async (uid: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${uid}`,

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
