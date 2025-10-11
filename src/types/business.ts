import { Genre } from "./music";

// Business 등록 요청 타입
export interface BusinessPayload {
  grade: string;
  price: number;
  period: number;
  editTime: number;
  businessDescription: string;
  genre: Genre | "";
  field: string | "";
}

export type BusinessForm = {
  genre: string;
  field: string;
  price: string;
  period: string;
  editTime: string;
  businessDescription: string;
};

export type Business = {
  id: number;
  grade: string;
  genre: string;
  field: string;
  price: string;
  period: string;
  editTime: string;
  businessDescription: string;
  profileImageUrl?: string;
  userId: number;
};

export interface BusinessResponse {
  business: Business[];
  nextCursor?: number;
  last: boolean;
}
