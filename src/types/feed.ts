export interface Feed {
  id: number;
  title: string;
  description: string;
  audioFiles: RemoteFile[];
  imageFiles: RemoteFile[];
  creatorProfileImageUrl: string;
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

export interface RemoteFile {
  fileId: string;
  fileSize: number;
  fileType: string;
  order: number;
  originalFileName: string;
  url: string;
}
