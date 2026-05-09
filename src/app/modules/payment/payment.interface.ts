import { Request, Response } from "express";
import Payment from "../models/payment.model";
import Order from "../models/order.model";

/**
 * Create Payment (initiate payment)
 */
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, amount, method } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const payment = await Payment.create({
      orderId,
      userId: req.user?.id,
      amount,
      method,
      status: "pending",
    });

    return res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Payment creation failed",
      error: error.message,
    });
  }
};
