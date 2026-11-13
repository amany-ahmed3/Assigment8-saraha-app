import {OTP} from "../../common/db/otp.model.js";

export async function createOtp(code,userId,expiresAt){

   return  await OTP.create({
        code:code,
        userId: userId,
        expiresAt: expiresAt
    });
}

export async function findOtpByUserId(userId){
    return  await OTP.findOne({userId:userId});
}
export async function deleteOtp(userId){
    return await OTP.deleteOne({userId:userId});
}

export async function deleteAllOTPs(userId){
   return await OTP.deleteMany({userId:userId});
}