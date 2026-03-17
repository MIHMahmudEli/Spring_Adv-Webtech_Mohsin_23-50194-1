export interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  description?: string;
}