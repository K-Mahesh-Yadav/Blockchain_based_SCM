const mongoose=require('mongoose');
const Transaction = new mongoose.Schema({
  Name: String,
  Date:Date,
  From:String,
  To:String,
  GasUsed:Number,
  Transaction_Hash: String,

},
{ collection: "Transactions" }
);



module.exports=mongoose.model("Transaction",Transaction);