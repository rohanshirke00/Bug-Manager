const express =  require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")




const app = express()
const PORT = process.env.PORT ||  5000




// using express.json() to get data in json format
app.use(express.json())


app.use(cors())




// import the routes
const BugRoute = require("./routes/bugs")




// connnecting to mongoDb
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log("Database connnected successfully"))
.catch((err) => console.log(err))




// using the route
app.use("/",BugRoute)




// connecting to server
app.listen(PORT , () => {
    console.log("server is running.....")
})

