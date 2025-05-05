import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../utils/types';
import prisma from '../../utils/prisma';
import { validateResto } from './resto.schemas';
import logger from '../../utils/logger';

/**
 * @swagger
 * tags:
 *   name: restaurants
 *   description: All restaurants endpoints
 */

export default class RestoController {
  /**
   * @swagger
   * /restaurants/addResto:
   *  post:
   *    description: Create a new resto
   *    summary: Create a new resto
   *    parameters:
   *      - in: body
   *        name: resto
   *        description: The resto to create.
   *        schema:
   *          type: object
   *          required:
   *            - name
   *            - location
   *          properties:
   *            name:
   *              type: string
   *            location:
   *              type: string
   *    responses:
   *      201:
   *        description: Resto created successfully
   *      404:
   *        description: Invalid Body
   *      500:
   *        description: Internal Server Error
   */
  public static async addResto(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    const data = validateResto(req.body);
    try {
      logger.info('Attempting to add a new restaurant', { userId: req.user?.userId, data });
      const resto = await prisma.resto.create({
        data: { ...data, users: { connect: { id: req.user?.userId } } },
      });
      logger.info('Restaurant added successfully', { resto });
      res.status(201).json(resto);
    } catch (error) {
      logger.error('Error adding restaurant', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

          /**
  * @swagger
  * /restaurants/getRestos:
  *  get:
  *    tags:
  *    - restaurants
  *    description: Get all restaurants
  *    responses:
  *      200:
  *        description: List of restaurants
  *      500:
  *        description: Internal Server Error
  */
  
  public static async getResto(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Fetching restaurants for user', { userId: req.user?.userId });
      const restos = await prisma.resto.findMany({
        where: { users: { some: { id: req.user?.userId } } },
        select: {
          id: true,
          name: true,
          location: true,
        },
      });
      logger.info('Restaurants fetched successfully', { restos });
      res.status(200).json(restos);
    } catch (error) {
      logger.error('Error fetching restaurants', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}


export const addResto = RestoController.addResto;
export const getResto = RestoController.getResto;