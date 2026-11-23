import z from 'zod';
import {Types} from "mongoose";

export const createMessageDto = z.object({
    content:z.string().trim().min(1).max(200),
    receiver:z.string().length(24).refine((val)=>{
        return Types.ObjectId.isValid(val)

    },{message:'receiver must be a valid ObjectId'})

});