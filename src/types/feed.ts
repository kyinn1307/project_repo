export interface Feed {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  liked: boolean;
  likeCount: number;
  creatorId: number;
  creatorNickname: string;
  tags: string[];
}

export interface FeedResponse {
  feeds: Feed[];
  nextCursor?: number;
  last: boolean;
}
