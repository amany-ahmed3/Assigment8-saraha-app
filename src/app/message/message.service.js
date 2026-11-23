import * as userRepository from '../user/user.repository.js';
import * as messageRepository from'../message/message.repository.js';
import {AppError, UserNotFound} from "../../common/error/error.js";

export async function sendMessage(content,receiver,sender){
    //1- check if receiver  exists
    const user = await userRepository.findUserById(receiver);
    //2- if no, throw error
    if(!user)
        throw UserNotFound;
    //3- save them into DB
    await messageRepository.createMessage(content,receiver,sender);
}

export async function getMessages(userId, page = 1 , limit =10 ){
   const messages=  await messageRepository.getMessages(userId);
   if(messages.length === 0 )new AppError('No messages found',404);
   return messages;
}