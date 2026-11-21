import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  verifyStripePayment, 
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/place/stripe", authMiddleware, placeOrderStripe);
router.get("/verify", verifyStripePayment);
router.get("/user", authMiddleware, getUserOrders);
router.get("/all", getAllOrders);
router.put("/status/:id", updateOrderStatus);

export default router;
