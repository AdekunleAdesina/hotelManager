if(process.env.NODE_ENV !=="production"){
    require("dotenv").config()
    console.log(process.env.DATABASE_URL)
}

const express = require("express")
const app = express()
const expressLayout = require("express-ejs-layouts")
const mongoose = require("mongoose")
const indexRouter = require("./routes/index")


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true
})
const db =mongoose.connection
db.on("error", (error)=>{console.error(error)})
db.once("open", ()=>{console.log("mongoose connection is successful")})

app.set("view engine", "ejs")
app.set("views", __dirname+ "/views")
app.set("layout", "layouts/layout")

app.use(expressLayout)
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use("/", indexRouter)

app.listen(process.env.POST || 3000)