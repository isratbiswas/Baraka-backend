import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product.interface";

export interface ProductDocument extends IProduct, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    shortDescription: String,

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    sku: String,

    category: {
      type: String,
      required: true,
    },

    subCategory: String,

    brand: String,

    images: [
      {
        type: String,
      },
    ],

    ratingsAverage: {
      type: Number,
      default: 0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    tags: [String],
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema,
);
