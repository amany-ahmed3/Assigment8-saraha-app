export function globalErrorHandler(error,req,res,_next){
        console.log(error);
        res.status(error.statusCode || 500)
            .json({message: error.message ,success:false});

}