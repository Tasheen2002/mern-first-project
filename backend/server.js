import express from "express"; //framework of node.js
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from 'cors';

 // This will allow requests from all origins


dotenv.config();

const app = express(); //express is a function. when calling it it returns a object that store in a variable called app.
//app.listen is the one of the function in the app object.
// const PORT=process.env.PORT || 5000;

// console.log(process.env.MONGO_URI);
app.use(cors());
app.use(express.json()); //allow us to accept json data in the req.body
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});