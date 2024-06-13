import jwt from "jsonwebtoken";
import { Response } from "express";
export default function generateTokenAndSetCookie(res: Response, user: User) {
  let token;
  token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "1d" });
  res.cookie("LINK_CHAT_COOKIE", token, { httpOnly: true, maxAge: 1*24*60*60*1000 , sameSite:"strict" });
}
