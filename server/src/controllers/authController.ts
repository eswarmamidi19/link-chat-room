import expressAsyncHandler from "express-async-handler";
import User from "../models/User";
import generateTokenAndSetCookie from "../utils/generateToken";
import { IUser } from "../types";

export const login = expressAsyncHandler ( async (req, res) => {
  const {username , password} = req.body;
  const user = await User.findOne({username});
   if(!user){
     res.status(400);
     throw new Error("user does not exist");      
   }
  
   if(!await (user as IUser).matchPasswords(password)) {
    res.status(400);
    throw new Error("Invalid passwords");  
   }
   
   generateTokenAndSetCookie(res, user);
   res.json(user);
   
});

export const signUp = expressAsyncHandler(async (req, res) => {
  console.log(req.body)
  const { username, password, confirmpassword, gender } = req.body;
  if (password !== confirmpassword) {
    res.status(400);
    throw new Error("Invalid Password");
  }
  const user = await User.findOne({ username: username });
  if (user) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const boyProfilePic =
    "https://avatar.iran.liara.run/public/boy?username=" + username;
  const girlProfilePic =
    "https://avatar.iran.liara.run/public/girl?username=" + username;

  const newuser = await User.create({
    username: username,
    password: password,
    gender: gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });
  if (!newuser) {
    res.status(400);
    throw new Error("User not created");
  }
  generateTokenAndSetCookie(res,newuser);
  res.status(200);
  res.json(newuser);
});

export const logOut = expressAsyncHandler((req, res) => {
  res.send("Logout");
});
