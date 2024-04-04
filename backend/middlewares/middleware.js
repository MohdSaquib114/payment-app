require("dotenv").config()
const jwt = require("jsonwebtoken")
const {User} = require("../db")
const JWT_SECRET = process.env.JWT_SECRET
const zod = require("zod")


async function authMiddleware(req,res,next){
    
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId = decoded.userId
next()
    }catch(e){
res.status(404).json({
    message:"You are not authenticated"
})
    }
   }

   function requestValidation(req,res,next){
    const signupBody = zod.object({
        firstname: zod.string(),
        lastname: zod.string(),
        username: zod.string().email(),
        password: zod.string()
    })
   
    const  {success} = signupBody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            
            message: "Incorrect inputs"
        })
    }else{
      next()
    }
    
}
async function userExist(req,res,next){
    const {username} = req.body
    const user =  await User.findOne({username})
    if(!user){
        next()
    }else{
    
        res.status(411).json({
            message: "Email already taken"
        }) 
    }

}


   module.exports = {
    authMiddleware,
userExist,
requestValidation
   }
