import express from 'express';
import './common/db/connection.js'
import mongoose from "mongoose";
import {authRouter} from "./app/auth/auth.route.js";
import {messageRouter} from "./app/message/message.route.js";
import {userRouter} from "./app/user/user.route.js";
import {config} from "./config/config.js";
import cors from 'cors';
import {globalErrorHandler} from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());


app.use(cors({origin:[config.serverFE]}));


app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);
app.use('/api/user',userRouter);


app.use(globalErrorHandler);
const server= app.listen(config.port,()=>{
    console.log(`Server running on port ${config.port}`);
});

const shutdown = async ()=>{
    await mongoose.disconnect();
    server.close();
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
