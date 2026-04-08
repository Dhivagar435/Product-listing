import { Request, Response, NextFunction } from "express";


export interface StaffControllerInterface {
    addStaff(req: Request, res: Response, next: NextFunction): void;
    getStaff(req: Request, res: Response, next: NextFunction): void;
    updateStaff(req: Request, res: Response, next: NextFunction): void;


}