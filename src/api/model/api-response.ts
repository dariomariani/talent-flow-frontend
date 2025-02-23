export interface ApiResponse<T> {
  payload?: T;
  message: string;
  success: boolean;
}
