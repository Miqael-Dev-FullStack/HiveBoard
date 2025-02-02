import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "config/config";
import { IUser } from "models/userModels";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.token || req.cookies.googleToken;
  try {
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = Jwt.verify(token, JWT_SECRET) as Partial<IUser>;
    req.user = decoded as IUser;
    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(401).send({ message: "Unauthorized" });
  }
};
