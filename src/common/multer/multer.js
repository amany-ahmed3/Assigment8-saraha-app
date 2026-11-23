import multer, {diskStorage} from 'multer';
import {AppError} from "../error/error.js";

export function toBytes(size,unit){
    switch(unit){
        case'MB':
            return size * 1024 *1024;
        case 'KB':
            return size * 1024;
        case'B':
                return size;
    }
}


export function multerUpload(fileSize = toBytes(5,'MB')){
    return multer({
        limits:{fileSize:fileSize},
        fileFilter:function(req,file,cb){
            let allowedTypes = ['image/jpeg','image/jpg','image/png','image/webp','image/gif']
            if(allowedTypes.includes(file.mimetype === false)){
                return cb(new AppError('invalid type format ',400),false);
            }
            cb(null,true);
        },
        storage:diskStorage({
            destination: "uploads",
           filename:function (req,file,cb){
                console.log(file);  //file info
                file.originalname=file.originalname.replace(/\s+/g, '-');
                cb(null,file.originalname)
            }
        })
    });

}

export function uploadFile(filedName,fileSize){
    return multerUpload(fileSize).single(filedName);
}

export function uploadFiles(filedName,maxCount=10){
    return multerUpload().array(filedName,maxCount);
}
