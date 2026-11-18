// dto >> data transfer object
// set contract between FE and BE

import z from 'zod';


              // contract of register
export const registerDto = z.object({
    userName: z.string().trim().min(2).max(20),
    email: z.email().trim().lowercase(),
    password: z.string().min(8),
    profilePicPath: z.string().optional(),
});

             // contract of verify account
export const verifyAccountDto = z.object({
    email:z.email().trim().lowercase(),
    code:z.string().length(6),
});

              // contract of send OTP
export const sendOtpDto = z.object({
    email :z.email().trim().lowercase(),
});

              // contract of login
export const loginDto = z.object({
    email:z.email().trim().lowercase(),
    password:z.string().min(8),
});

            // contract of login with Google
export const loginWithGoogleDto = z.object({
    idToken :z.string(),
});
