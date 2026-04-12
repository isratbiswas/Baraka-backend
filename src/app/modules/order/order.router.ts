import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

// 📦 Create order
router.post("/orders", createOrder);

// 📄 Get all orders (Admin)
router.get("/orders", getAllOrders);

// 👤 Get orders by user
router.get("/orders/user/:userId", getUserOrders);

// 🔍 Get single order
router.get("/orders/:orderId", getOrderById);

// 🔄 Update order status (Admin)
router.patch("/orders/:orderId", updateOrderStatus);

// ❌ Delete order (Admin optional)
router.delete("/orders/:orderId", deleteOrder);

export default router;
