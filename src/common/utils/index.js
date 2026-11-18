import jwt from 'jsonwebtoken';
import {config} from "../../config/config.js";
import bcrypt from 'bcryptjs';
import  crypto from "node:crypto";
import {OAuth2Client} from "google-auth-library";


               // verify idToken
const client = new OAuth2Client();
export async function verifyIdToken(idToken){
    const ticket = await  client.verifyIdToken({
        idToken: idToken,
        audience:[config.clientId]   //secure <<
    });
    return ticket.getPayload();  // {email,pp, fullName,googleId}

}
               // hash password
export  function hashPassword(password){
    return  bcrypt.hash(password ,10);
}

              // generate token
export function generateAccessToken(payload){
    return jwt.sign(payload,config.jwtSecret,{expiresIn: toSeconds(1,'h')});
}

             // compare password
export function comparePassword(password, hashedPassword){
    return bcrypt.compare(password , hashedPassword);
}

            // generate OTPs
export function generateOTP(){

    return crypto.randomInt(100000,999999)
}

export function toMs(time , unit){
    switch (unit){
        case 'm':
            return time * 60 * 1000;
        case 'h':
            return time * 60 *60 *1000;
        case 'd':
            return time * 24 * 60 * 60 * 1000;
        case's':
            return time *1000;
    }

}

export function toSeconds(time , unit){
    switch (unit){
        case 'm':
            return time * 60  ;
        case 'h':
            return time * 60 *60 ;
        case 'd':
            return time * 24 * 60 * 60 ;
        case's':
            return time ;
    }

}