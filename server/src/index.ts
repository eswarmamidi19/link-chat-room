import express from "express";
import { errorMiddleWare, notFound } from "./middleware/errorMiddleware";
import dotenv from "dotenv"
import authRouter from "./routes/authRouter";
import connect from "./db/connection";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth" , authRouter);

app.use(notFound);
app.use(errorMiddleWare);

app.listen(process.env.PORT || 3000 , ()=>{
     connect();
     console.log("Hello Server " + process.env.PORT || 3000);
});
