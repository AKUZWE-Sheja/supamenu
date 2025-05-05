import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma';
import { Prisma } from '@prisma/client';
import { signupSchema, loginSchema, validateNewUser, validateOldUser } from './auth.schemas';
import { z } from 'zod';
import logger from '../../utils/logger';

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Login and signup endpoints
 */

export default class AuthController {
    /**
     * @swagger
     * /auth/signup:
     *  post:
     *    tags:
     *      - user
     *    description: Create a new user
     *    summary: Create a new user
     *    parameters:
     *      - in: body
     *        name: user
     *        description: The user to create.
     *        schema:
     *          type: object
     *          required:
     *            - name
     *            - email
     *            - password
     *            - phone
     *          properties:
     *            name:
     *              type: string
     *            email:
     *              type: string
     *            phone:
     *              type: string
     *            password:
     *              type: string
     *    responses:
     *      201:
     *        description: User created successfully
     *      404:
     *        description: Invalid Body
     *      500:
     *        description: Internal Server Error
     */
    public static async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info("Signup route hit");
            logger.info("Request body received:", req.body);

            if (!req.body || Object.keys(req.body).length === 0) {
                logger.warn("Request body is empty");
                res.status(400).json({ error: "Request body is empty" });
                return;
            }

            const user = validateNewUser(req.body);
            logger.info("Validated user data:", user);

            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (existingUser) {
                logger.warn(`User with email ${user.email} already exists`);
                res.status(400).json({
                    message: "User with that email already exists",
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);
            logger.info("Password hashed successfully");

            const newUser = await prisma.user.create({
                data: {
                    ...user,
                    password: hashedPassword,
                },
                select: { id: true, name: true, email: true, role: true, phone: true },
            });

            const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || '9090c1e99fbcd0f2ac79c903902c48ed685b4ecadbe7765f66ef3c0241b1c600', {
                expiresIn: '1h',
            });

            logger.info(`User created successfully with ID: ${newUser.id}`);
            res.json({ token, user: newUser });
        } catch (error) {
            if (error instanceof z.ZodError) {
                logger.warn("Validation error:", error.errors);
                res.status(400).json({ error: error.errors });
                return;
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                logger.error("Prisma error:", error.message);
                res.status(500).json({ error: "Database error" });
                return;
            }
            logger.error("Server error:", error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    /**
     * @swagger
     * /auth/login:
     *  post:
     *    description: Login a user
     *    parameters:
     *      - in: body
     *        name: user
     *        description: The user to login.
     *        schema:
     *          type: object
     *          required:
     *            - email
     *            - password
     *          properties:
     *            email:
     *              type: string
     *            password:
     *              type: string
     *    responses:
     *      200:
     *        description: Login successful
     *      400:
     *        description: Invalid email or password
     *      500:
     *        description: Internal Server Error
     */
    public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info("Login route hit");
            logger.info("Request body received:", req.body);

            const data = validateOldUser(req.body);
            logger.info("Validated login data:", data);

            const user = await prisma.user.findUnique({
                where: { email: data.email },
                select: { id: true, name: true, email: true, password: true, role: true, phone: true },
            });

            if (!user) {
                logger.warn(`User with email ${data.email} not found`);
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                logger.warn("Invalid password for user:", user.email);
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
                expiresIn: '1h',
            });

            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
            };

            logger.info(`User logged in successfully with ID: ${user.id}`);
            res.json({ token, user: userData });
        } catch (error) {
            if (error instanceof z.ZodError) {
                logger.warn("Validation error:", error.errors);
                res.status(400).json({ error: error.errors });
                return;
            }
            logger.error("Server error:", error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    /**
     * @swagger
     * /auth/logout:
     *  get:
     *    description: Logout a user
     *    responses:
     *      200:
     *        description: Logout successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal Server Error
     */
    public static async logout(req: Request, res: Response): Promise<void> {
        try {
            logger.info("Logout route hit");
            res.setHeader("Authorization", `Bearer `);
            res.status(200).json({
                success: true,
                message: "Logout successful",
            });
            logger.info("User logged out successfully");
        } catch (error) {
            logger.error("Server error during logout:", error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
}

export const signup = AuthController.signup;
export const login = AuthController.login;
export const logout = AuthController.logout;