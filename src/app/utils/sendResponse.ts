import { Response } from "express";

interface TMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  meta?: TMeta;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    message: data.message,
    success: data.success,
    data: data.data,
    meta: data.meta,
  });
};

export default sendResponse;
