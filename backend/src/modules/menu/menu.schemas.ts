import { z } from 'zod';

export const menuSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().optional(),
  qrCode: z.string().url('QR Code must be a valid URL').optional(),
  restoId: z.number().optional(), // Optional if the menu is not linked to a restaurant
});

export const validateMenu = (data: any) => {
  const menu = menuSchema.safeParse(data);
  if (!menu.success) {
    throw new Error(menu.error.errors[0].message);
  }
  return menu.data;
};