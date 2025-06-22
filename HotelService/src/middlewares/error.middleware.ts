import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const genericErrorHandeler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    })
}