import {AppError} from "../common/error/error.js";
import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

export function authGuard(req, res, next){
    try{

        const authorization = req.headers.authorization;
        if(!authorization) throw new AppError('Unauthorized',401);
        const token = authorization.split( ' ')[1];
        if(!token) throw new AppError('Token is required',401);
       const payload=  jwt.verify(token,config.jwtSecret); //{name,email,sub}
        console.log(payload);
        req.user = payload;
        next();

    }catch(error){
        next(error);
    }
}