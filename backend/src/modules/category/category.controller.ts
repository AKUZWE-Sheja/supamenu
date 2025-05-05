import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../utils/types';
import prisma from '../../utils/prisma';
import { validateCategory } from './category.schemas';
import logger from '../../utils/logger';

/**
 * @swagger
 * tags:
 *   name: categories
 *   description: All category endpoints
 */

export default class CategoryController {
  /**
   * @swagger
   * /addCategory:
   *  post:
   *    tags:
   *      - categories
   *    description: Create a new category
   *    summary: Create a new category
   *    parameters:
   *      - in: body
   *        name: category
   *        description: The category to create.
   *        schema:
   *          type: object
   *          required:
   *            - name
   *            - menuId
   *          properties:
   *            name:
   *              type: string
   *            menuId:
   *              type: integer
   *    responses:
   *      201:
   *        description: Category created successfully
   *      400:
   *        description: Invalid input
   *      500:
   *        description: Internal Server Error
   */
  public static async addCategory(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const data = validateCategory(req.body);
    try {
      logger.info('Attempting to create a new category', { userId: req.user?.userId, data });
      const category = await prisma.category.create({
        data: {
          name: data.name,
          Menu: {
            connect: { id: data.menuId },
          },
        },
      });
      logger.info('Category created successfully', { category });
      res.status(201).json(category);
    } catch (error) {
      logger.error('Error creating category', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /categories:
   *  get:
   *    tags:
   *      - categories
   *    description: Get all categories
   *    responses:
   *      200:
   *        description: List of categories
   *      500:
   *        description: Internal Server Error
   */
  public static async getCategory(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Fetching all categories for user', { userId: req.user?.userId });
      const categories = await prisma.category.findMany({
        where: {
          Menu: {
            Resto: {
              users: { some: { id: req.user?.userId } },
            },
          },
        },
        select: {
          id: true,
          name: true,
          Menu: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      logger.info('Categories fetched successfully', { categories });
      res.status(200).json(categories);
    } catch (error) {
      logger.error('Error fetching categories', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /categories/{id}:
   *  put:
   *    tags:
   *      - categories
   *    description: Update a category
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the category to update
   *      - in: body
   *        name: category
   *        description: The updated category data
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *    responses:
   *      200:
   *        description: Category updated successfully
   *      404:
   *        description: Category not found
   *      500:
   *        description: Internal Server Error
   */
  public static async updateCategory(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;
    try {
      logger.info('Attempting to update category', { categoryId: id, data: { name } });
      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { name },
      });
      logger.info('Category updated successfully', { category });
      res.status(200).json(category);
    } catch (error) {
      logger.error('Error updating category', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * @swagger
   * /categories/{id}:
   *  delete:
   *    tags:
   *      - categories
   *    description: Delete a category
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the category to delete
   *    responses:
   *      200:
   *        description: Category deleted successfully
   *      404:
   *        description: Category not found
   *      500:
   *        description: Internal Server Error
   */
  public static async deleteCategory(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      logger.info('Attempting to delete category', { categoryId: id });
      await prisma.category.delete({
        where: { id: Number(id) },
      });
      logger.info('Category deleted successfully', { categoryId: id });
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      logger.error('Error deleting category', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const addCategory = CategoryController.addCategory;
export const getCategory = CategoryController.getCategory;
export const updateCategory = CategoryController.updateCategory;
export const deleteCategory = CategoryController.deleteCategory;