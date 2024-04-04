const router = require("express").Router()
const {Account, User } = require("../db")
const zod = require("zod")
const {authMiddleware} = require("../middlewares/middleware")
const mongoose = require("mongoose")


router.get("/balance", authMiddleware,async function(req,res){
   try{
    const userId = req.userId

   const  balance  = await Account.findOne({userId})
  


    res.status(200).json({
     balance:balance
    })

}
   catch(e){
    res.status(400).json({
        error:e.message
    })
   }
})

router.post("/transfer", authMiddleware ,async function (req, res)  {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

   
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
   const resp=  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);

   const resp1= await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
   

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router