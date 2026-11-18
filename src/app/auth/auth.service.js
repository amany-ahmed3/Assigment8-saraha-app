import * as userRepository from'../user/user.repository.js';
// import * as authRepository from '../auth/auth.repository.js';
import {sendEmail} from "../../common/email/nodemedailer.js";
import {comparePassword, generateAccessToken, generateOTP, hashPassword,toMs,toSeconds} from "../../common/utils/index.js";
import{UserAlreadyExists,
    InvalidCredentials,
    UserNotVerified,
    InvalidOtp,
    OTPExpired,
    UserNotFound}
    from "../../common/error/error.js";

import * as cache from'../../common/cache/redis.js';


export async function register(userName,email,password) {
    // 1- check if user exist
    const user = await userRepository.findUserByEmail(email)

    // 2- if exist throw an error
    if (user) throw UserAlreadyExists;

    // 3- prepare data
    const hashedPassword = await hashPassword(password);

    // 4- save data into database
    const createdUser = await userRepository.createUser({userName:userName ,email:email , password:hashedPassword});

    // 5- generate OTP and save into DB
    const code = generateOTP();
    //await authRepository.createOtp(code,createdUser._id , new Date(Date.now() + toMs(15,'m')))

   await  cache.set(`otp:${email}`, code ,toSeconds(15,'m'));

    // 6- send email
    await sendEmail(
        email,
        "Verify your account",
        `<h3>Your code to verify your account is ${code}</h3>`)

    // omit password >> delete password from response
     delete createdUser.password;
     createdUser.password = undefined;
     return createdUser;

}

export async function verifyAccount(email,code){
     // 1- check if user exists
    const user = await userRepository.findUserByEmail(email);

    // 2- if not exist throw an error
     if(!user) throw UserNotFound;

    // 3-check if code related by email
  //  const otp = await authRepository.findOtpByUserId(user._id);
    const cashedcode = await cache.get(`otp:${email}`);
    if(!cashedcode) throw OTPExpired;
    if(cashedcode !== code ) throw  InvalidOtp;

    // 4- update user isVerified == true
      await userRepository.updateUser(user._id , {isVerified:true});

    // 5- delete OTP from DB
 //  await authRepository.deleteOtp(user._id);
    await cache.del(`otp:${email}`);


}

export async function sendOtp(email){
    // 1- check if email exists
   const user = await  userRepository.findUserByEmail(email);
   if(!user)throw  UserNotFound;

    // 2- delete all OTPs related to email
    //await authRepository.deleteAllOTPs(user._id)
   await cache.del(`otp:${email}`);

    // 3- generate new  OTP save it into DB
    const code = generateOTP();
   //await  authRepository.createOtp(code,user._id,new Date(Date.now()+toMs(5,'m')));
    await cache.set(`otp:${email}`,code,toSeconds(5,'m'));

    // 4- send Email
   await sendEmail(email,'new OTP',`<h3>your new OTP is ${code}</h3>`);
}


export async function login (email , password){
    // 1- check email exists
  const user =  await userRepository.findUserByEmail(email);
  if(!user) throw  UserNotFound;
  if(user.isVerified  === false ) throw  UserNotVerified;

    // 2- check password
   const match = await comparePassword(password,user.password);
   if(!match) throw  InvalidCredentials;

    // 3- return user
    const payload = {
        name:user.userName,
        email:email,
        sub:user._id
    }
 const accessToken =generateAccessToken(payload)
    return accessToken;

    // logout<< remove tokens from cookies and local storage
}


export async function loginWithGoogle(idToken){
    // 1- verify idToken
    const payload = await  verifyIdToken(idToken); // <<Encapsulation

    // 2- get user info from Google
    // 3- check user existence
    const user = await userRepository.findUserByEmail(payload.email);

    // 4- if exists return token
    if(user){
        return generateAccessToken(payload);
    }

    // 5- if not created user and return token
   const createdUser =  await userRepository.createUser({
        email:payload.email,
        userName:payload.name,
        provider:'google',
        isVerified:true,
        profilePicPath:payload.picture
    });

    return  generateAccessToken({sub:createdUser._id , email:createdUser.email});

}

