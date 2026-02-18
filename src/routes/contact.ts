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
      address: 'איחוד הצלה סניף שוהם',
      emergencyNumber: '101',
      businessHours: {
        weekday: '08:00 - 18:00',
        weekend: '09:00 - 17:00',
      },
      socialLinks: {
        facebook: 'https://facebook.com/your-page',
        instagram: 'https://instagram.com/your-page',
        whatsapp: 'https://wa.me/your-number',
      },
    },
  });
});

export default router;
