const mongoose = require("mongoose")

async function connection(url){
try{
    
    await mongoose.connect(url)
  console.log("Database is connected")
 
}catch(e){
 return  new Error(e.message)
} 
}

module.exports = connection