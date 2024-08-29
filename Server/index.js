
require('dotenv').config();

const cors=require("cors");

const express=require('express');
const connectDb=require("./utils/db")
const port=process.env.PORT||5000;
const authRoute=require("./Router/auth-router");
const errormiddleware = require('./middlewares/error-middleware');
const app=express();
const contactRoute=require("./Router/contact-router");
const serviceRoute=require("./Router/service-router");
const adminRoute=require("./Router/admin-router")
const corsOptions={
    origin:"https://codinghub-frontend.onrender.com",
    method:"GET, PUT, POST, DELETE, PATCH,",
    credentials : true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/form',contactRoute);
app.use('/api/data',serviceRoute);
app.use('/api/admin',adminRoute);
app.use(errormiddleware);
connectDb().then(()=>{
app.listen(port,()=>{
    console.log(`server started at port: ${port}`);
});
});
