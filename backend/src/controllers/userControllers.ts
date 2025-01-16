import { Response, Request } from "express";
import User from "../models/userModels";

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};
