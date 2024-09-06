//.Here require .env file.
require('dotenv').config();
//***here i require cors which gives permission to frontend.
const cors=require("cors");
//**here i require express .
const express=require('express');

//database file
const connectDb=require("./utils/db")

//port
const port=process.env.PORT;

//authRoute contains login register authentication many more.
const authRoute=require("./Router/auth-router");
//errormiddleware contains error regarding backend.
const errormiddleware = require('./middlewares/error-middleware');
//here i require app as express type.
const app=express();
const contactRoute=require("./Router/contact-router");
const serviceRoute=require("./Router/service-router");
const adminRoute=require("./Router/admin-router")
//this is the cors validation
const corsOptions={
    origin:"https://codinghub-frontend.onrender.com",
    method:"GET, PUT, POST, DELETE, PATCH,",
    credentials : true,
};
app.use(cors(corsOptions));
//this line read json file .
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/form',contactRoute);
app.use('/api/data',serviceRoute);
app.use('/api/admin',adminRoute);
app.use(errormiddleware);

//here the server start
connectDb().then(()=>{
app.listen(port,()=>{
    console.log(`server started at port: ${port}`);
});
});
