import { Document } from "mongoose";
export type user = {
    username: string;
    password: string;
    gender: "male" | "female";
    profilePic?: string | null | undefined;
}

export interface ResponseFromAuthMiddleWare extends Response{
     username : string;
} 

export interface IUser extends Document{
    username : string;
    password :string;
    gender : "male" | "female";
    profilePic? : string;
    matchPasswords(password:string):Promise<boolean>;
}