const mongoose = require("mongoose")

async function connection(url){
try{
    
    await mongoose.connect(url)
 
}catch(e){
 return  new Error(e.message)
} 
}

module.exports = connection