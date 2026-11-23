import {Router} from "express";
import * as messageController from './message.controller.js';
import {validationMiddleware} from "../../middleware/validation.middleware.js";
import {createMessageDto} from "./message.dto.js";
import {authGuard} from "../../middleware/auth.middleware.js";
export const messageRouter=Router();

messageRouter.post('/send-anonymous',validationMiddleware(createMessageDto),messageController.sendMessage);
messageRouter.post('/send-public',authGuard,messageController.sendMessage);
messageRouter.get('/',authGuard,messageController.getMessages)
