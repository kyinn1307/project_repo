export interface Project {
  id: number;
  title: string;
  description: string;
  fileUrls: string[];
  genres: string[];
  fields: string[];
  liked: boolean;
  likeCount: number;
  creatorId: number;
  creatorNickname: string;
}

export interface ProjectResponse {
  projects: Project[];
  nextCursor?: number;
  last: boolean;
}
