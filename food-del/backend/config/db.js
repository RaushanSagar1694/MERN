

import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sagar:7544941694@cluster0.teois.mongodb.net/food-del')
    .then(() => console.log("DB Connected"));
    
}
