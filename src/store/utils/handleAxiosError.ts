import {AxiosError} from "axios";

export const handleAxiosError = (error: unknown): string => {
  const e = error as AxiosError;

  return e.message;
}