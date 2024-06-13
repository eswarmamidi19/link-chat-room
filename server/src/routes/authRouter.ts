import { Router } from "express";
import { logOut, login, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup" , signUp);
authRouter.post("/login" , login);
authRouter.post("/logout"  , logOut);


export default authRouter;

