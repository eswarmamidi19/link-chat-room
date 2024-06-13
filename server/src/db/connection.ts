import mongoose from "mongoose";

const connect = async  ()=>{
      try{
          const conn = await mongoose.connect(process.env.MONGO_URI!);
          console.log("Connection made" + conn.connection.host);
      }
      catch(e){
         console.log(e);
         process.exit(1);
      }
}

export default connect;