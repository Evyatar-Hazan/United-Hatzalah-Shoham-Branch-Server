import { Router, Response } from 'express';
import { ContactController } from '../controllers/ContactController';

const router = Router();

router.post('/', ContactController.submitContactMessage);
router.get('/messages', ContactController.getContactMessages);

// Contact info endpoint
router.get('/info', (_req, res: Response) => {
  res.json({
    success: true,
    data: {
      email: 'contact@shoham.united-hatzalah.org.il',
      phone: '+972-XX-XXX-XXXX',
      address: 'יחידת הצלה שמואל שוהם',
    },
  });
});

export default router;
