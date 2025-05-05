// Middleware to authenticate requests using JWT
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../utils/types';

// Verify JWT token and attach user to request
export const authenticate = (req: RequestWithUser, res: Response, next: NextFunction) => {
  // Extract token from Authorization header (Bearer <token>)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    // Verify token and decode user ID
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
      req.user = { userId: decoded.userId as number };
      console.log('Authenticated user:', req.user);
      next();
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};