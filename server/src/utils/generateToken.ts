import jwt from "jsonwebtoken";
import { Response } from "express";
import {user} from "../types"
export default function generateTokenAndSetCookie(res: Response, user: user) {
  let token;
  token = jwt.sign({username:user.username}, process.env.JWT_SECRET!, { expiresIn: "1d" });
  res.cookie("LINK_CHAT_COOKIE", token, { httpOnly: true, maxAge: 1*24*60*60*1000 , sameSite:"strict" });
}
