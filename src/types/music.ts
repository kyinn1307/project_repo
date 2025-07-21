export interface Music {
  id: number;
  title: string;
  audioUrl: string;
  imageUrl: string;
  creatorId: number;
  creatorNickname: string;
  genres: string[];
  tags: string[];
  playCount: number;
  likeCount: number;
  liked: boolean;
}

export interface TrackResponse {
  tracks: Music[];
  nextCursor?: number;
  last: boolean;
}

export type Genre =
  | "팝"
  | "힙합"
  | "록"
  | "재즈"
  | "인디"
  | "R&B"
  | "클래식"
  | "트로트"
  | "컨트리"
  | "일렉트로닉"
  | "발라드"
  | "그 외";

export type EmotionTag =
  | "bouncy"
  | "dark"
  | "energetic"
  | "soulful"
  | "inspiring"
  | "confident"
  | "sad"
  | "calm"
  | "angry"
  | "happy"
  | "relaxed"
  | "epic"
  | "determined"
  | "crazy"
  | "intense"
  | "loved"
  | "dirty"
  | "depressed"
  | "lonely"
  | "hyper"
  | "evil"
  | "peaceful"
  | "grateful"
  | "gloomy"
  | "anxious"
  | "powerful"
  | "adored"
  | "scary"
  | "enraged"
  | "lazy"
  | "romantic"
  | "disappointed"
  | "scared"
  | "frantic"
  | "exciting"
  | "tense"
  | "dramatic";
