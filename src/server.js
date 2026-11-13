import express from 'express';
import './common/db/connection.js'
import mongoose from "mongoose";
import {authRouter} from "./app/auth/auth.route.js";
import {messageRouter} from "./app/message/message.route.js";
import {userRouter} from "./app/user/user.route.js";


const app = express();

app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);
app.use('api/user',userRouter);


app.use((error ,req, res, next )=>{
    res.json({message: error.message ,success:false});
})
const server= app.listen(3000,()=>{
    console.log("Server running on port 3000");
});

const shutdown = async ()=>{
    await mongoose.disconnect();
    server.close();
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
