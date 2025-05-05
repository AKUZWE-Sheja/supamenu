import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../utils/types';
import prisma from '../../utils/prisma';
import { validateOrder } from './order.schemas';
import logger from '../../utils/logger';

/**
 * @swagger
 * tags:
 *   name: orders
 *   description: All order endpoints
 */

export default class OrdersController {
  /**
   * @swagger
   * /orders/addOrder:
   *  post:
   *    tags:
   *      - orders
   *    description: Create a new order
   *    summary: Create a new order
   *    parameters:
   *      - in: body
   *        name: order
   *        description: The order to create.
   *        schema:
   *          type: object
   *          required:
   *            - total
   *            - items
   *          properties:
   *            customerName:
   *              type: string
   *            total:
   *              type: number
   *            items:
   *              type: array
   *              items:
   *                type: integer
   *            restoId:
   *              type: integer
   *    responses:
   *      201:
   *        description: Order created successfully
   *      400:
   *        description: Invalid input
   *      500:
   *        description: Internal Server Error
   */
  public static async addOrder(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const data = validateOrder(req.body);
    try {
      logger.info('Attempting to create a new order', { userId: req.user?.userId, data });
      const order = await prisma.order.create({
        data: {
          customerName: data.customerName,
          total: data.total,
          Resto: data.restoId ? { connect: { id: data.restoId } } : undefined,
          items: {
            connect: data.items.map((itemId: number) => ({ id: itemId })),
          },
        },
      });
      logger.info('Order created successfully', { order });
      res.status(201).json(order);
    } catch (error) {
      logger.error('Error creating order', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /orders/getOrders:
   *  get:
   *    tags:
   *      - orders
   *    description: Get all orders
   *    responses:
   *      200:
   *        description: List of orders
   *      500:
   *        description: Internal Server Error
   */
  public static async getOrders(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Fetching all orders');
      const orders = await prisma.order.findMany({
        select: {
          id: true,
          customerName: true,
          total: true,
          items: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
          Resto: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      logger.info('Orders fetched successfully', { orders });
      res.status(200).json(orders);
    } catch (error) {
      logger.error('Error fetching orders', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /orders/{id}:
   *  put:
   *    tags:
   *      - orders
   *    description: Update an order
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the order to update
   *      - in: body
   *        name: order
   *        description: The updated order data
   *        schema:
   *          type: object
   *          properties:
   *            customerName:
   *              type: string
   *            total:
   *              type: number
   *            items:
   *              type: array
   *              items:
   *                type: integer
   *    responses:
   *      200:
   *        description: Order updated successfully
   *      404:
   *        description: Order not found
   *      500:
   *        description: Internal Server Error
   */
  public static async updateOrder(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { customerName, total, items } = req.body;
    try {
      logger.info('Attempting to update order', { orderId: id, data: { customerName, total, items } });
      const order = await prisma.order.update({
        where: { id: Number(id) },
        data: {
          customerName,
          total,
          items: {
            set: items.map((itemId: number) => ({ id: itemId })),
          },
        },
      });
      logger.info('Order updated successfully', { order });
      res.status(200).json(order);
    } catch (error) {
      logger.error('Error updating order', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /orders/{id}:
   *  delete:
   *    tags:
   *      - orders
   *    description: Delete an order
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the order to delete
   *    responses:
   *      200:
   *        description: Order deleted successfully
   *      404:
   *        description: Order not found
   *      500:
   *        description: Internal Server Error
   */
  public static async deleteOrder(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      logger.info('Attempting to delete order', { orderId: id });
      await prisma.order.delete({
        where: { id: Number(id) },
      });
      logger.info('Order deleted successfully', { orderId: id });
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      logger.error('Error deleting order', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const addOrder = OrdersController.addOrder;
export const getOrders = OrdersController.getOrders;
export const updateOrder = OrdersController.updateOrder;
export const deleteOrder = OrdersController.deleteOrder;