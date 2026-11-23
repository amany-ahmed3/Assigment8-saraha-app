import {Message} from "../../common/db/message.model.js";

export async function createMessage(content , receiver , sender){
    return Message.create({
        content:content,
        receiver:receiver,
        sender:sender
    });
}

export async function getMessages(receiver,page,limit){
    return Message.find(
        {receiver:receiver},
        {__v:0 , updateAt:0},
        {
            sort:{createdAt:-1},
            limit:limit,
            skip:(page-1) * limit,
            populate:{
                path:'sender',
                select:'userName'
            }
        }
    );
}