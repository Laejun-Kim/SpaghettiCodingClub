import { Teams, createTeamsProps } from '@/types/types';
import axios from 'axios';

interface createTeamProps {
  trackId: number;
  trackWeekId: number;
  teamData: Teams;
}

const token =
  typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

// 팀 생성
export const createTeam = async ({
  trackId,
  trackWeekId,
  teamData,
}: createTeamsProps) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/trackWeeks/${trackWeekId}/teams`,
      { teams: teamData },
      {
        headers: {
          'Content-Type': 'application/json',
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

// 팀 조회 (트랙주차 단일 상세조회)
export const getTeams = async (trackId: number, weekId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/weeks/${weekId}`,
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
