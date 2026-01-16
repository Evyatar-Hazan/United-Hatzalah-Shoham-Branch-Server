import { Router, Response } from 'express';
import { AdminService } from '../services/AdminService';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all admin routes
router.use(authMiddleware);

// Gallery Management
router.get('/gallery', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.getGallery();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.post('/gallery', async (req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.addGalleryItem(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.put('/gallery/:id', async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await AdminService.updateGalleryItem(parseInt(id), req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.delete('/gallery/:id', async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await AdminService.deleteGalleryItem(parseInt(id));
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

// Stories Management
router.get('/stories', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.getStories();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.post('/stories', async (req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.addStory(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.put('/stories/:id', async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await AdminService.updateStory(parseInt(id), req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.delete('/stories/:id', async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await AdminService.deleteStory(parseInt(id));
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

// Statistics Management
router.get('/statistics', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.getStatistics();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.put('/statistics', async (req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.updateStatistics(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

// Contact Info Management
router.get('/contact-info', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.getContactInfo();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

router.put('/contact-info', async (req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.updateContactInfo(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date(),
    });
  }
});

// Contact Messages
router.get('/contact-messages', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await AdminService.getContactMessages();
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
