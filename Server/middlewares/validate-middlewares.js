
const validate =(schema) =>async(req,res,next)=>{
    try{
        const parseBody=await schema.parseAsync(req.body);
        req.body=parseBody;
        next();

    }catch(err){
        const status=422;
        const message="Fill the input properly"
        const extraDetails = err.issues.map((curElem) => curElem.message);
        console.log(message);
       const error={
            status,
            message,
            extraDetails,
        }
        next(error);

        

    }

}
module.exports=validate;