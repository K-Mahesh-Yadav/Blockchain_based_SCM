const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
  Name: {
    type:String,
    unique:true,
  },
  Id: {
    type:String,
    unique:true,
  },
  Id1: Number,
  Password: String,
  Role: String,
  Account:{
    type:String,
    default:"mahesh",
  }
},
{ collection: "Register" }
);


module.exports=mongoose.model("userSchema",userSchema);