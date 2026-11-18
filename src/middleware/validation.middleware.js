// function
// 2 params Data{req.body }, contract{dto} >> fit >> next service
import z from 'zod';

export  function validationMiddleware(dto){
    return function (req , res , next){

        const {success,data}= z.safeParse(dto,req.body);

        if(!success){
            throw new Error('Validation failed');
        }
        req.body = data;     // >> data after modify (validation +transformation )
        next();
    }
}