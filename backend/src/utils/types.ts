// Defines custom TypeScript types (e.g., RequestWithUser) and ensures type safety across middleware and controllers.

// Custom types for type safety
import { Request } from 'express';

// Extend Request to include user data from JWT
export interface RequestWithUser extends Request {
    user?: { userId: number };
}