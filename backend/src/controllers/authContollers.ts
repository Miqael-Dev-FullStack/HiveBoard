import { Response, Request } from "express";
import User from "../models/userModels";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "config/config";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ name: user.name, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id_token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const { name, email, sub, picture } = payload;
    let user = await User.findOne({ email });

    if (user && user.password) {
      return res.status(400).send({
        message:
          "This email is already registered with a password. Please log in using your password.",
      });
    }

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        picture,
      });
    }
    const googleToken = jwt.sign(
      { name: user.name, email: user.email, picture: user.picture },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("googleToken", googleToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send({ message: user });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("token");
    res.clearCookie("googleToken");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
