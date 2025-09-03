export interface MusicianResponse {
  users: Musician[];
  nextCursor?: number;
  last: boolean;
}

export interface Musician {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  relationshipStatus: number;
  fields: string[];
  genres: string[];
}

export interface Participant {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  joinedAt: string;
}
