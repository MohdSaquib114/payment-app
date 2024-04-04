const express = require("express");
const connection = require("./connection")
const router = require("./routes/index")
const cors = require("cors")
require("dotenv").config()

const DATABASE_URL = process.env.DATABASE_URL

const PORT = process.env.PORT || 5050

const app  = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1", router)


app.listen(PORT, ()=>console.log(`Server is listening on port number ${PORT}`))

connection(DATABASE_URL)



