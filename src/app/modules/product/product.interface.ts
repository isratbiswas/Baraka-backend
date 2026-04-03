export interface IProduct {
  name: string;
  slug: string;

  description?: string;
  shortDescription?: string;

  price: number;
  discountPrice?: number;

  stock: number;
  sku?: string;

  category: string;
  subCategory?: string;
  brand?: string;

  images: string[];

  ratingsAverage?: number;
  ratingsQuantity?: number;

  isFeatured?: boolean;
  isActive?: boolean;

  tags?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
