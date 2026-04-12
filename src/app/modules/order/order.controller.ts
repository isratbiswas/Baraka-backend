import { Response } from "express";
import { Order } from "./order.model";

// ✅ Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, totalPrice, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      shippingAddress,
      status: "pending",
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// 📄 Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All orders fetched",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// 👤 Get orders by user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "User orders fetched",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};

// 🔍 Get single order
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order fetched",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// 🔄 Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// ❌ Delete order (optional - admin)
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
