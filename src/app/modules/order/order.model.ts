import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "./order.interface";

export interface OrderDocument extends IOrder, Document {}

const orderSchema = new Schema<OrderDocument>(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    shippingPrice: Number,
    taxPrice: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,

    transactionId: String,
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model<OrderDocument>("Order", orderSchema);
