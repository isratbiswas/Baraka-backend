export interface IOrderItem {
  product: string; // product ID
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
}

export type PaymentMethod = "COD" | "ONLINE";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrder {
  user: string; // user ID

  items: IOrderItem[];

  shippingAddress: IShippingAddress;

  paymentMethod: PaymentMethod;

  paymentStatus: "pending" | "paid" | "failed";

  totalPrice: number;
  shippingPrice?: number;
  taxPrice?: number;

  status: OrderStatus;

  isPaid?: boolean;
  paidAt?: Date;

  isDelivered?: boolean;
  deliveredAt?: Date;

  transactionId?: string; // for online payment

  createdAt?: Date;
  updatedAt?: Date;
}
