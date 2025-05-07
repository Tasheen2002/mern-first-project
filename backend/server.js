import express from "express"; //framework of node.js
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express(); //express is a function. when calling it it returns a object that store in a variable called app.
//app.listen is the one of the function in the app object.

// console.log(process.env.MONGO_URI);

app.use(express.json()); //allow us to accept json data in the req.body



app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
});



app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
