import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(3, 'Name is required'),
  menuId: z.number().int().positive('Menu ID must be a positive integer'),
});

export const validateCategory = (data: any) => {
  const category = categorySchema.safeParse(data);
  if (!category.success) {
    throw new Error(category.error.errors[0].message);
  }
  return category.data;
}