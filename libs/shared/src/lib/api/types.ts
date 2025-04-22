export interface ApiResponse<T> {
  status: number;
  code: string;
  data: T;
}
