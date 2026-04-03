import { Product } from "./product.model";
import { IProduct } from "./product.interface";

// ✅ Create Product
const createProduct = async (payload: IProduct) => {
  const product = await Product.create(payload);
  return product;
};

// ✅ Get All Products (Search + Filter + Pagination + Sorting)
const getAllProducts = async (queryParams: any) => {
  const {
    search = "",
    category,
    minPrice,
    maxPrice,
    page = "1",
    limit = "10",
    sort = "-createdAt",
  } = queryParams;

  const query: any = {};

  // 🔍 Search
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // 📂 Category Filter
  if (category) {
    query.category = category;
  }

  // 💰 Price Filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // 📄 Pagination
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const products = await Product.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNumber);

  const total = await Product.countDocuments(query);

  return {
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
    data: products,
  };
};

// ✅ Get Single Product
const getSingleProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// ✅ Update Product
const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const product = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// ✅ Delete Product
const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return null;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
