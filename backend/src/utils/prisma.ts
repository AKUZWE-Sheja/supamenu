// This initializes a singleton Prisma client and provides a shared database client for all modules.

// Singleton Prisma client for database interactions
import { PrismaClient } from '@prisma/client';

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

export default prisma;