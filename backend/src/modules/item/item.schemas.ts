import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  price: z.number().positive('Price must be a positive number'),
  description: z.string().optional(),
  image: z.string().url('Image must be a valid URL').optional(),
  categoryId: z.number().optional(),
});

export const validateItem = (data: any) => {
  const item = itemSchema.safeParse(data);
  if (!item.success) {
    throw new Error(item.error.errors[0].message);
  }
  return item.data;
};