import {AxiosError} from "axios";

export const handleAxiosError = (error: unknown): string => {
  const e = error as AxiosError;

  if (e.response?.data) {
    return e.response.data as string
  }
  return e.message;
}