import { z } from 'zod';

export const orderSchema = z.object({
  customerName: z.string().min(3, 'Customer name is required').optional(),
  total: z.number().positive('Total must be a positive number'),
  items: z.array(z.number()).nonempty('Order must contain at least one item'), // Array of item IDs
  restoId: z.number().optional(), // Optional if the order is not linked to a restaurant
});

export const validateOrder = (data: any) => {
  const order = orderSchema.safeParse(data);
  if (!order.success) {
    throw new Error(order.error.errors[0].message);
  }
  return order.data;
};