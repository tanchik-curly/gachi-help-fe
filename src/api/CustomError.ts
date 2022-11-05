import { AxiosError } from 'axios';

interface ErrorToJSON {
  status: number;
  message: string;
}

interface ResponseData {
  status?: number;
  title?: string;
}

export class CustomError extends Error {
  status: number;

  message: string;

  responseData?: ResponseData;

  constructor(error: AxiosError) {
    super();
    if (error.response) {
      this.responseData = error.response?.data as any;
    }

    const errorToJson = error.toJSON() as ErrorToJSON;
    this.status = errorToJson.status;
    this.message = errorToJson.message;
  }
}
