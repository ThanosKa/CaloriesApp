import axios, { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status: number;
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    return {
      message: axiosError.response?.data?.message || 'An unexpected error occurred',
      status: axiosError.response?.status || 500,
    };
  }
  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
};
