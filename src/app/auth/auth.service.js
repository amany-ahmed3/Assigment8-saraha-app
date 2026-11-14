import * as userRepository from'../user/user.repository.js';
import * as authRepository from '../auth/auth.repository.js';
import bcrypt from 'bcryptjs';
import {sendEmail} from "../../common/email/nodemedailer.js";
import crypto from "node:crypto";
import {toMs, toSeconds} from "../../common/utils/time.js";
import jwt from 'jsonwebtoken';
import {config} from "../../config/config.js";

export async function register(userName,email,password) {
    // 1- check if user exist
    const user = await userRepository.findUserByEmail(email)

    // 2- if exist throw an error
    if (user) throw new Error("User already exists");

    // 3- prepare data
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4- save data into database
    const createdUser = await userRepository.createUser(userName, email, hashedPassword);

    // omit password >> delete password from response
    delete createdUser.password;
    createdUser.password = undefined;
    return createdUser;

    // 5- generate OTP and save into DB
    const code = crypto.randomInt(100000, 999999);
  await authRepository.createOtp(code,createdUser._id , new Date(Date.now() + toMs(15,'m')))
    // 6- send email

    await sendEmail(
        email,
        "Verify your account",
        `<h3>Your code to verify your account is ${code}</h3>`)



}

export async function verifyAccount(code,email){
     // 1- check if user exists
    const user = await userRepository.findUserByEmail(email);
    // 2- if not exist throw an error
     if(!user) throw new Error("User not found)");
    // 3-check if code related by email
    const otp = await authRepository.findOtpByUserId(user._id);
    if(!otp) throw new Error("Invalid or Expired");
    if(otp.code !== code ) throw new Error("Invalid code ")
    // 4- update user isVerified == true
     const updateUser= await userRepository.updateUser(user._id , {isVerified:true});
    // 5- delete OTP from DB
   await authRepository.deleteOtp(user._id);


}

export async function sendOtp(){
    // 1- check hif email exists
   const user = await  userRepository.findUserByEmail(email);
   if(!user)throw new Error('User not found');
    // 2- delete all OTPs related to email
    await authRepository.deleteAllOTPs(user._id)
    // 3- generate new  OTP save it into DB
    const code = crypto.randomInt(100000,999999);
  const otp=  await  authRepository.createOtp(code,user._id,new Date(Date.now()+toMs(5,'m')));
    // 4- send Email
   await sendEmail(email,'new OTP',`<h3>your new OTP is ${code}</h3>`);
}


export async function login (email , password){
    // 1- check email exists
  const user =  await userRepository.findUserByEmail(email);
  if(!user) throw new Error('User not found ');
  if(user.isverified === false ) throw new Error('User not verified');
    // 2- check password
   const match = await  bcrypt.compare(password,user.password);
   if(!match) throw new Error ('Invalid Credentials');
    // 3- return user
    const payload = {
        name:user.userName,
        email:email,
        sub:user._id
    }
 const accessToken = jwt.sign(payload,config.jwtSecret , {expires:toSeconds(1,'h')});
    return accessToken;

    // logout<< remove tokens from cookies and local storage
}