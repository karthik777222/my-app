import express from "express";
import multer from "multer";
import {
  listProducts,
  getProduct,
  addProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// 🔹 Use memory storage instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/list", listProducts);
router.get("/:id", getProduct);

// Accept multiple image fields
router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.delete("/:id", deleteProduct);

export default router;
