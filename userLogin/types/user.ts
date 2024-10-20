export type Role = 0 | 2; // 0 Standard User; 2 Member User

export interface UserInfo {
    userId: string;
    username: string;
    avatar?: string;
    platform?: string;
    email: string;
    membershipExpire?: number;
    accessToken?: string;
    role?:number
  }
