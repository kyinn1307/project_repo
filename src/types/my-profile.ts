export interface Profile {
  email: string;
  feedCount: number;
  fields: string[];
  followerCount: number;
  followingCount: number;
  genres: string[];
  id: number;
  introduction: string | null;
  link: string | null;
  nickname: string;
  profileImageUrl: string | null;
  relationship: number;
  trackCount: number;
  phoneNumber?: string;
}
