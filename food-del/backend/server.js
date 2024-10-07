

import express from "express";
import cors from "cors";
import { connectDB } from './config/db.js';
import foodRouter from "./routers/foodRoute.js";
import foodModel from './models/foodModel.js';




//app config
const app = express();
const port = 400;


//middleware
app.use(express.json())
app.use(cors())


// DB connection
connectDB();



// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));


//add data 
const user = new foodModel({
    name : "test 1",
    description: "desc test",
    price: 10,
    
    category: "veg"
})


// user.save().then((res) => {
//     console.log("data saved Successfuly");
// })
// .catch((err) => {
//     console.log(err);
// })






app.get("/", (req, res)=> {
    res.send("API Working")
})


app.listen(port, ()=>{
    console.log(`Server Started on http:localhost: ${port}`);
})


//mongodb+srv://sagar:<db_password>@cluster0.teois.mongodb.net/?