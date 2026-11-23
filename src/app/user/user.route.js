import {Router} from "express";
import {uploadFile, uploadFiles} from "../../common/multer/multer.js";
import {fileValidation} from "../../middleware/file-validation-middleware.js";

export const userRouter = Router();

userRouter.post('/upload-profile-pic',uploadFile('pp')
    ,fileValidation,
    (req,res,next) => {
    console.log(req.file);
    res.send('OK');
})


userRouter.post('/upload-files',uploadFiles('cc',2),
    (req,res,next)=>{
        console.log(req.file);
        res.send('OK');
    })