const bcryptjs = require("bcryptjs");
const User = require("../models/user-model");
const home = async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Welcome to world best mern series by thapa technical using router"
      );
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res,next) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    }
    

    //hash the password
    // const saltRound = 10;
    // const hash_password = await bcryptjs.hash(password, saltRound);
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res
      .status(200)
      .json({
        msg:"registration successful",
        data: userCreated,
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    // res.status(500).json("internal server error");
    next(error);
  }
};
//User Login 

const login= async (req,res,next)=>{
  try{
    const {email,password}=req.body;

    const userExist=await User.findOne({email});

    if(!userExist){
      return res.status(400).json({message : "Inavlid Email"})
    }
    const user=await userExist.comparePassword(password);
    // bcryptjs.compare(password,userExist.password);

    if(user){
      res
      .status(200)
      .json({
        msg:"Login Successful",
        data: userExist,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });

    }
    else{
       res.status(401).json({message: "invalid  password"});
    //   const status=401;
    //   const message="invalid password";
      
    //   const error={
    //     status,
    //     message,
        
    //   }
    //   next(error);
    }
  }
  catch(error){
    next(error)
  }
};


//to send user data -User Logic

const user= async (req,res)=>{
  try{
    const userData=req.user;
    // console.log(userData);
    return res.status(200).json({userData});



  }catch(error){
    console.log(`error form the user router ${error}`);

  }

}






module.exports = { home, register ,login ,user};
