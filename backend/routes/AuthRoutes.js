const {register,login,getdetails,transactions,gettransactions,jwtValidation}=require('../controllers/authControllers.js');
// const {checkUser} = require('../middlewares/authMiddleware.js')

const router=require('express').Router();


router.post('/Register',register);


router.get('/Details',getdetails);
router.get('/Login',login);


router.post('/SendTransactions',transactions);
router.get('/getTransactions',gettransactions);
router.get('/',jwtValidation)


// router.post("/");
module.exports=router;
