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
  views: number;
  collaboration: Collaboration;
  createdAt: string;
}

export interface ProjectResponse {
  projects: Project[];
  nextCursor?: number;
  last: boolean;
}

export type Collaboration = "팀원 모집" | "프로젝트" | "피드백" | "외주 요청";
