import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
     username : {
        type:String,
        required : true
     },
     password:{
         type : String,
         required:true
     },
     gender:{
         type : String,
         required:true,
         enum : ["male" , "female"]
     },
     profilePic :{
         type:String,
         defult:""
     }
});

userSchema.methods.matchPasswords = async function(password : string){
    return await bcrypt.compare(password , this.password)
}

userSchema.pre("save" , async function(next){
   if(!this.isModified("password")){
     next();
   }  
   const salt  =  await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password , salt); 
});


const User = mongoose.model("User" , userSchema);
export default User;