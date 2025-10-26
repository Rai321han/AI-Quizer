import { Response } from "express";

export class APIResponse {
  static success(
    res: Response,
    message: string = "Success",
    data: any = null,
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message: string = "Something went wrong",
    statusCode: number = 500,
    errorCode?: string
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errorCode,
    });
  }
}
