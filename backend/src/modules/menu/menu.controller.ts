import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../utils/types';
import prisma from '../../utils/prisma';
import { validateMenu } from './menu.schemas';
import logger from '../../utils/logger';

/**
 * @swagger
 * tags:
 *   name: menus
 *   description: All menu endpoints
 */

export default class MenuController {
  /**
   * @swagger
   * /menus/addMenu:
   *  post:
   *    tags:
   *      - menus
   *    description: Create a new menu
   *    summary: Create a new menu
   *    parameters:
   *      - in: body
   *        name: menu
   *        description: The menu to create.
   *        schema:
   *          type: object
   *          required:
   *            - name
   *            - restoId
   *          properties:
   *            name:
   *              type: string
   *            description:
   *              type: string
   *            qrCode:
   *              type: string
   *            restoId:
   *              type: integer
   *    responses:
   *      201:
   *        description: Menu created successfully
   *      400:
   *        description: Invalid input
   *      500:
   *        description: Internal Server Error
   */
  public static async addMenu(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const data = validateMenu(req.body);
    try {
      logger.info('Attempting to create a new menu', { userId: req.user?.userId, data });
      const menu = await prisma.menu.create({
        data: {
          name: data.name,
          description: data.description,
          qrCode: data.qrCode,
          Resto: data.restoId ? { connect: { id: data.restoId } } : undefined,
        },
      });
      logger.info('Menu created successfully', { menu });
      res.status(201).json(menu);
    } catch (error) {
      logger.error('Error creating menu', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /menus/getMenus:
   *  get:
   *    tags:
   *      - menus
   *    description: Get all menus
   *    responses:
   *      200:
   *        description: List of menus
   *      500:
   *        description: Internal Server Error
   */
  public static async getMenus(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Fetching all menus');
      const menus = await prisma.menu.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          qrCode: true,
          Resto: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      logger.info('Menus fetched successfully', { menus });
      res.status(200).json(menus);
    } catch (error) {
      logger.error('Error fetching menus', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /menus/{id}:
   *  put:
   *    tags:
   *      - menus
   *    description: Update a menu
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the menu to update
   *      - in: body
   *        name: menu
   *        description: The updated menu data
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *            description:
   *              type: string
   *            qrCode:
   *              type: string
   *    responses:
   *      200:
   *        description: Menu updated successfully
   *      404:
   *        description: Menu not found
   *      500:
   *        description: Internal Server Error
   */
  public static async updateMenu(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { name, description, qrCode } = req.body;
    try {
      logger.info('Attempting to update menu', { menuId: id, data: { name, description, qrCode } });
      const menu = await prisma.menu.update({
        where: { id: Number(id) },
        data: { name, description, qrCode },
      });
      logger.info('Menu updated successfully', { menu });
      res.status(200).json(menu);
    } catch (error) {
      logger.error('Error updating menu', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /menus/{id}:
   *  delete:
   *    tags:
   *      - menus
   *    description: Delete a menu
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the menu to delete
   *    responses:
   *      200:
   *        description: Menu deleted successfully
   *      404:
   *        description: Menu not found
   *      500:
   *        description: Internal Server Error
   */
  public static async deleteMenu(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      logger.info('Attempting to delete menu', { menuId: id });
      await prisma.menu.delete({
        where: { id: Number(id) },
      });
      logger.info('Menu deleted successfully', { menuId: id });
      res.status(200).json({ message: 'Menu deleted successfully' });
    } catch (error) {
      logger.error('Error deleting menu', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const addMenu = MenuController.addMenu;
export const getMenus = MenuController.getMenus;
export const updateMenu = MenuController.updateMenu;
export const deleteMenu = MenuController.deleteMenu;