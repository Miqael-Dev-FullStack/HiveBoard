import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "config/config";

interface jwtPayLoad {
  name: string;
  email: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const decoded = Jwt.verify(token, JWT_SECRET) as jwtPayLoad;
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Unauthorized" });
  }
};
