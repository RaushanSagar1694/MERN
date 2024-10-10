

import express from "express";
import cors from "cors";
import { connectDB } from './config/db.js';
import foodRouter from "./routers/foodRoute.js";
import foodModel from './models/foodModel.js';
import userRouter from "./routers/userRoute.js";
import 'dotenv/config'




//app config
const app = express();
const port = 400;


//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : true}));


// DB connection
connectDB();



// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);






app.get("/", (req, res)=> {
    res.send("API Working")
})


app.listen(port, ()=>{
    console.log(`Server Started on http:localhost: ${port}`);
})


//mongodb+srv://sagar:<db_password>@cluster0.teois.mongodb.net/?