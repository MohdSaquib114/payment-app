const router = require("express").Router()
const {User, Account} = require("../db")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const {userExist,authMiddleware,requestValidation } = require("../middlewares/middleware")
const { mongo, default: mongoose } = require("mongoose")
require("dotenv").config()


const JWT_SECRET = process.env.JWT_SECRET 


router.post("/signup", requestValidation,userExist,async function(req,res){
    try{
    

        
        const {username,password,firstname,lastname} = req.body
        const max = 10000
        const min = 1
     
        const user = await User.create({
            username,
            password,
            firstname,
            lastname,
            
        })
      
        
        await Account.create({
            userId:user._id,
            balance:Math.floor(Math.random() * (max - min) + min)
        })
      
        const token = jwt.sign({userId:user._id},JWT_SECRET)
      
        res.status(200).json({
            message: "User created successfully",
            token: token
        })
        
    }catch(e){
       
        res.status(400).json({error:e.message})
    }

})


router.post("/signin", async function(req,res){
    try{

        const signinbody = zod.object({
            username:zod.string().email(),
            password:zod.string()
        })
      
        const {success} = signinbody.safeParse(req.body)
        if(!success){
         
          res.json({error:"Incorrect Inputs"})  
          return 
                
          
        }
        
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
  


        if (user !== null) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
            
            res.status(200).json({
                token: token
            })
            return;
        }else if(user === null){

            res.status(411).json({
                message: "Error while logging in"
            })
        }
        
        
        
        
    }catch(e){
       
        res.status(400).json({error:e.message})
    }
    })
router.get('/',authMiddleware,async function(req,res){
 const userId = req.userId
 try{

     const user = await User.findById(userId)
    res.status(200).json({user:user})
 }catch(e){
    res.status(400).json({error:e})
 }

})

router.put("/", authMiddleware,async function(req,res){
    const singBody = zod.object({
        username: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
        password: zod.string().optional()
    })
    const {success} = singBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    try{

        const user = await User.findByIdAndUpdate({_id:req.userId},req.body)
            res.json({
        message: "Updated successfully"
    })
    }catch(e){
        res.status(400).json({error:e.message})
    }
})

router.get("/bulk", authMiddleware,async function(req,res){
    const filter = req.query.filter || ""

    try{
        const users = await User.find({
            $or:[
              {  firstname:{
                    $regex:filter
                }},
                {
                    lastname:{
                        $regex:filter
                    }
                }
            ]
        })
   
        res.status(200).json({
            user:users.filter(user=>user._id.toHexString() !== req.userId) 
        })
    }catch(e){
        res.status(400).json({
            error:e.message
        })
    }
})

module.exports= router