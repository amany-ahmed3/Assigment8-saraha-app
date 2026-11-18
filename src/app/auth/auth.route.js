import {Router} from 'express';
import * as authController from'./auth.controller.js';
import {validationMiddleware} from "../../middleware/validation.middleware.js";
import {loginDto, loginWithGoogleDto, registerDto, sendOtpDto, verifyAccountDto} from "./auth.dto.js";
export const authRouter=Router();

authRouter.post('/register', validationMiddleware(registerDto),authController.register);
authRouter.patch('/verify-account',validationMiddleware(verifyAccountDto),authController.verifyAccount);
authRouter.post('/send-otp',validationMiddleware(sendOtpDto),authController.sendOtp);
authRouter.post('/login',validationMiddleware(loginDto),authController.login);
authRouter.post('/login-with-google',validationMiddleware(loginWithGoogleDto),authController.loginWithGoogle);