import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const router = Router();

// Google OAuth verification
router.post('/google-verify', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const result = await AuthService.verifyGoogleToken(token);
    
    if (!result.success) {
      res.status(401).json({
        success: false,
        error: result.error,
        timestamp: new Date(),
      });
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

// Check if user is admin
router.post('/check-admin', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await AuthService.checkIfAdmin(email);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

export default router;
