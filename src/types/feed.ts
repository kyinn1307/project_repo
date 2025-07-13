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
