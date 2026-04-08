import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    message: string,
    data: any = {},
    statusCode: number = 200,
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    error?: unknown,
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
}
