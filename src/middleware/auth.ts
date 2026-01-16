import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export interface AuthRequest extends Request {
  user?: {
    email: string;
    name: string;
    picture: string;
    isAdmin: boolean;
  };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Missing or invalid authorization header',
        timestamp: new Date(),
      });
      return;
    }

    const token = authHeader.substring(7);
    const result = await AuthService.verifyGoogleToken(token);

    if (!result.success || !result.data?.isAdmin) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized or not an admin',
        timestamp: new Date(),
      });
      return;
    }

    req.user = result.data;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Authentication error',
      timestamp: new Date(),
    });
  }
};
