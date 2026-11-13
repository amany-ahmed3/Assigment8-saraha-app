import {Router} from 'express';
import * as authController from'./auth.controller.js';
export const authRouter=Router();

authRouter.post('/register',authController.register);
authRouter.patch('/verify-account',authController.verifyAccount);
authRouter.post('/send-otp',authController.sendOtp);
authRouter.post('/login',authController.login);