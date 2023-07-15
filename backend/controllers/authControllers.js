const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel.js');
const transactionSchema = require("../models/transactions.js")
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');
const { parse } = require("cookie");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, "super secret key", {
    expiresIn: maxAge
  });
};


module.exports.update = async (req,res) => {
  let {ASCId,ASCPassword,userId,newPassword}=req.body;
  const salt = await bcrypt.genSalt();
  newPassword = await bcrypt.hash(req.body.Password, salt);
  try {
    userModel.findOne({Id:ASCId}).then(()=>{
        UserModel.findOneAndUpdate({Id:userId},{Password:newPassword})
    })
  } catch (error) {
    
  }
}

module.exports.jwtValidation = async (req, res) => {
  let token = req.cookies.jwt;
  if (token) {
    const { id } = jwt.verify(token, "super secret key");
    const result = await UserModel.findById(id);
    res.json({ result });
  }
}

module.exports.gettransactions = async (req, res) => {
  let x = req.query.param1 + "";
  await transactionSchema.find({ Name: x })
    .then(result => {
      res.json(result)
    });
}

module.exports.transactions = async (req, res) => {
  await transactionSchema.create(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
}





module.exports.register = async (req, res) => {
  const salt = await bcrypt.genSalt();
  req.body.Password = await bcrypt.hash(req.body.Password, salt);
  await userModel.create(req.body)
    .then(result => {
      res.result({status:"success"})
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
}



module.exports.login = async (req, res) => {
  let x = req.query.param1;
  // let z = req.query.param3;
  try {
    UserModel.findOne({ Id:x })
      .then((result) => {
        if (result) {
          bcrypt.compare(req.query.param2, result.Password, function (err, result1) {
            if (result1) {
              // if (req.query.param3 == result.Account.toLowerCase()) {
                const token = createToken(result._id);
                res.cookie("jwt", token,
                  {
                    withCredentials: true,
                    httpOnly: false,

                    maxAge
                  });

                res.json({ result, status: "Success" });
              // }
              // else{
              //   res.json({ status: "Account" });
              // }
            }
            else {
              res.json({ status: "Password" });
            }
          });
        }
        else {
          res.json({ status: "User not found" });
        }
      })
  } catch (error) {
    res.json({ status: "Login error" });
  }
}


module.exports.getdetails = async (req, res) => {
  let x = req.query.param1 + "";
  await userModel.find({ Role: x })
    .then(result => {
      res.json(result)
    });
}