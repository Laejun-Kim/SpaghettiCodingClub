// 로그인 & 회원가입
export interface registerReqData {
  username: string;
  password: string;
  checkPassword: string;
  email: string;
  track?: string;
  recommendEmail?: string;
}
export interface loginReqData {
  password: string;
  email: string;
}

// 트랙
export interface tracksInfo {
  trackId: number;
  trackName: string;
}

// 트랙 참여자
export interface personData {
  userId: number;
  userName: string;
  trackId: number;
  trackName: string;
  joinedAt: string;
}

// 트랙 공지
export interface noticeData {
  noticeId: number;
  trackId: number;
  trackNoticeContent: string;
  trackNoticeTitle: string;
  userId: number;
}

// member data
export interface memberData {
  userId: number;
  userName: string;
}

export interface newNoticeData {
  trackNoticeTitle: string;
  trackNoticeContent: string;
}

export interface deleteNoticeData {
  trackId: number;
  noticeId: number;
}

// 트랙주차

export interface tracksWeekInfo {
  trackWeekId: number;
  weekName: string;
  startDate: string;
  endDate: string;
}

export interface newTrackWeekData {
  trackId: number;
  weekName: string;
  startDate: string;
  endDate: string;
}

// 평가
export interface assessmentData {
  background?: string;
  guidance?: string;
  relationship?: string;
  userId?: number;
}

// track수정 data
export interface trackUpdateData {
  trackId: number;
  reqData: string;
}

// 공지 type
export interface noticeData {
  noticeId: number;
  trackId: string;
  trackNoticeContent: string;
  trackNoticeTitle: string;
  userId: number;
}

// 공지 수정 params
export interface noticeUpdateData {
  trackId: number;
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
}
// student 트랙 변경 params
export interface changeTrackData {
  userId: number;
  oldTrackId: number;
  newTrackId: number;
}

// 일정 생성 params
export interface createScheduleData {
  title: string;
  startTime: string;
  endTime: string;
}

// 주차 data type
export interface trackWeekData {
  trackWeekId: number;
  weekName: string;
  startDate: string;
  endDate: string;
}

// 서버에서 받아온 팀 data
export interface ServerTeam {
  teamId: number;
  teamName: string;
  members: { userId: number; userName: string }[];
}

// 가공을 거친 팀 data
export interface TeamData {
  id: string;
  list: string[] | never[];
}

// 팀 들의 집합
export interface Teams {
  [key: string]: TeamData;
}

export interface TeamsData {
  teamName: string;
  memberIds: number[];
}

// 여러 팀 동시 생성 params
export interface createTeamsProps {
  trackId: number;
  trackWeekId: number;
  teamData: TeamsData[];
}
