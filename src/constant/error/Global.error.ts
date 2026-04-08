// import { Request, Response, NextFunction } from "express";
// import { AppError } from "./App.error";
// import { ERORR_MESSAGES } from "../message/Error.message";
// import { ApiResponse } from "../../utils/ApiResponse";

// export const globalErrorHandler = (
//   err: unknown,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.error(err);

//   if (err instanceof AppError) {
//     return ApiResponse.error(res, ERORR_MESSAGES.SERVER);
//   }

//   return ApiResponse.error(res, ERORR_MESSAGES.SERVER);
// };


import { Request, Response, NextFunction } from "express";
import { AppError } from "./App.error";


export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof AppError) {
    return res.status(err.statuscode).json({
      success: false,
      message: err.message
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};