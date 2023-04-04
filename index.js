const express=require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
require("dotenv").config();
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

// app.get("/",(req,res)=>{
//     res.end("Home page");
// });

app.use("/",userRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db");
    }catch(err){
        console.log(err);
        console.log("could connect to db");
    }
    console.log(`server started at port ${process.env.port}`)
})