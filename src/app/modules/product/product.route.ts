import express from "express";

const router = express.Router();

// Create Product
router.post("/", createProduct);

// Get All Products
router.get("/", getAllProducts);

// Get Single Product
router.get("/:id", getSingleProduct);

// Update Product
router.patch("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;
