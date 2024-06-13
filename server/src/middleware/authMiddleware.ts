import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

interface CustomResponse extends Response {
    username?: string;
}
 const authMiddleware = expressAsyncHandler(async (req: Request , res: CustomResponse , next: NextFunction) => {
  let token;
  token = req.cookies.LINK_CHAT_COOKIE;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as  jwt.JwtPayload;
      res.username = decoded.username;
      next();
    } catch (error) {
        res.status(400);
        throw new Error("Invalid token")
    }
  } else {
    res.status(400);
    throw new Error("No Cokkie is found");
  }
})

export default authMiddleware;