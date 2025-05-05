import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../utils/types';
import prisma from '../../utils/prisma';
import { validateItem } from './item.schemas';
import logger from '../../utils/logger';

/**
 * @swagger
 * tags:
 *   name: items
 *   description: All item endpoints
 */

export default class ItemsController {
  /**
   * @swagger
   * /items:
   *  post:
   *    tags:
   *      - items
   *    description: Create a new item
   *    summary: Create a new item
   *    parameters:
   *      - in: body
   *        name: item
   *        description: The item to create.
   *        schema:
   *          type: object
   *          required:
   *            - name
   *            - price
   *            - categoryId
   *          properties:
   *            name:
   *              type: string
   *            price:
   *              type: number
   *            description:
   *              type: string
   *            image:
   *              type: string
   *            categoryId:
   *              type: integer
   *    responses:
   *      201:
   *        description: Item created successfully
   *      400:
   *        description: Invalid input
   *      500:
   *        description: Internal Server Error
   */
  public static async addItem(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const data = validateItem(req.body);
    try {
      logger.info('Attempting to create a new item', { userId: req.user?.userId, data });
      const item = await prisma.item.create({
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image,
          Category: {
            connect: { id: data.categoryId },
          },
        },
      });
      logger.info('Item created successfully', { item });
      res.status(201).json(item);
    } catch (error) {
      logger.error('Error creating item', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }  

  /**
   * @swagger
   * /items:
   *  get:
   *    tags:
   *      - items
   *    description: Get all items
   *    responses:
   *      200:
   *        description: List of items
   *      500:
   *        description: Internal Server Error
   */
  public static async getItems(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Fetching all items');
      const items = await prisma.item.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          image: true,
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      logger.info('Items fetched successfully', { items });
      res.status(200).json(items);
    } catch (error) {
      logger.error('Error fetching items', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /items/{id}:
   *  put:
   *    tags:
   *      - items
   *    description: Update an item
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the item to update
   *      - in: body
   *        name: item
   *        description: The updated item data
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *            price:
   *              type: number
   *            description:
   *              type: string
   *            image:
   *              type: string
   *    responses:
   *      200:
   *        description: Item updated successfully
   *      404:
   *        description: Item not found
   *      500:
   *        description: Internal Server Error
   */
  public static async updateItem(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { name, price, description, image } = req.body;
    try {
      logger.info('Attempting to update item', { itemId: id, data: { name, price, description, image } });
      const item = await prisma.item.update({
        where: { id: Number(id) },
        data: { name, price, description, image },
      });
      logger.info('Item updated successfully', { item });
      res.status(200).json(item);
    } catch (error) {
      logger.error('Error updating item', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  /**
   * @swagger
   * /items/{id}:
   *  delete:
   *    tags:
   *      - items
   *    description: Delete an item
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the item to delete
   *    responses:
   *      200:
   *        description: Item deleted successfully
   *      404:
   *        description: Item not found
   *      500:
   *        description: Internal Server Error
   */
  public static async deleteItem(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      logger.info('Attempting to delete item', { itemId: id });
      await prisma.item.delete({
        where: { id: Number(id) },
      });
      logger.info('Item deleted successfully', { itemId: id });
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      logger.error('Error deleting item', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const addItem = ItemsController.addItem;
export const getItems = ItemsController.getItems;
export const updateItem = ItemsController.updateItem;
export const deleteItem = ItemsController.deleteItem;