import { z } from 'zod';

export const restoSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  location: z.string().min(5, 'Location is required'),
  contact: z.string().optional(),
});

export const validateResto = (data: any) => {
  const resto = restoSchema.safeParse(data);
  if (!resto.success) {
    throw new Error(resto.error.errors[0].message);
  }
  return resto.data;
}