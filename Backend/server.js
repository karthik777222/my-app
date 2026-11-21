import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import dotenv from "dotenv";
import connectCloudinary from "./config/cloudinary.js";


const app = express();

connectDB();
dotenv.config();
connectCloudinary();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"]
}));


app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Forever E-commerce API is running"
  });
});

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});