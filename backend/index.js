
const express=require('express');
const env=require('dotenv');
env.config({path:'../client/.env'});

const cors=require('cors');

const mongoose=require('mongoose');

const authRoues=require('./routes/AuthRoutes.js');

const app=express();
const cookieParser = require('cookie-parser');

 
mongoose.connect(process.env.mongourl,{useNewUrlParser:true,useUnifiedTopology:true}
).then(()=>{
  console.log("connected to mongodb");
}).catch((err=>{
  console.log(err);
}));

// app.use(cookieParser);



app.use(cors({origin:"http://localhost:3000",method:["OPTIONS","GET","POST"],credentials:true}));

app.use(cookieParser());

app.use(express.json());
app.use("/",authRoues);


app.listen(4000,()=>{
  console.log("connected to port 4000");
});