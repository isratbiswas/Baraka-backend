import { z } from "zod";

// ✅ Create Product Validation
export const createProductValidation = z.object({
  body: z.object({
    name: z
      .string({ error: "Product name is required" })
      .min(3, "Name must be at least 3 characters"),

    price: z
      .number({ error: "Price is required" })
      .positive("Price must be greater than 0"),

    discountPrice: z.number().optional(),

    stock: z
      .number({ error: "Stock is required" })
      .int()
      .nonnegative("Stock cannot be negative"),

    category: z.string({ error: "Category is required" }),

    subCategory: z.string().optional(),

    brand: z.string().optional(),

    description: z.string().optional(),

    shortDescription: z.string().optional(),

    images: z.array(z.string()).optional(),

    tags: z.array(z.string()).optional(),

    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateProductValidation = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    price: z.number().positive().optional(),
    discountPrice: z.number().optional(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    brand: z.string().optional(),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});
