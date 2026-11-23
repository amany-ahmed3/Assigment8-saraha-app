import * as messageService from'./message.service.js';

export async function sendMessage(req,res,next){
    try{

        const{content ,receiver}= req.body;
        const senderId = req.user?.sub;
       await messageService.sendMessage(content,receiver);
       res.json({message:"message sent successfully", success:true});

    }catch(error){
        next(error);
    }

}


export async function getMessages(req,res,next){
    try{

        const userId= req.user?.sub;
       const messages=  await messageService.getMessages(userId);
       res.json({message:'OK',success:true,data:messages});

    }catch(error){
        next(error);
    }

}