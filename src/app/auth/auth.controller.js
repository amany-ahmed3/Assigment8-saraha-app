
import * as authService from'../auth/auth.service.js';

export async function register (req, res, next){
    try{
        const {userName,email,password}= req.body;
       const user =  await authService.register(userName, email , password);
       res.status(201).json({message:"User registered successfully", success:true , data :user});

    }catch(err){
         next(err);

    }
}

export async function verifyAccount (req, res, next){
    try{
        const {email,code}= req.body;
        await authService.verifyAccount(email,code)
        res.status(201).json({message:"User verified successfully", success:true });

    }catch(err){
        next(err);

    }
}

export async function sendOtp (req, res, next){
    try{
        const {email}= req.body;
        await authService.sendOtp(email);
        res.status(201).json({message:"send OTP successfully", success:true });

    }catch(err){
        next(err);

    }
}


export async function login (req, res, next){
    try{
        const {email,password}= req.body;
      const token =  await authService.login(email,password);
        res.status(201).json({message:"OK", success:true,data:token });

    }catch(err){
        next(err);

    }
}


export async function loginWithGoogle (req, res, next){
    try{
        const {idToken}= req.body;
        const token =  await authService.loginWithGoogle(idToken);
        res.status(201).json({message:"OK", success:true,data:token });

    }catch(err){
        next(err);

    }
}