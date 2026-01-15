import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

const router = Router();

router.post('/', ContactController.submitContactForm);
router.get('/info', ContactController.getContactInfo);
router.get('/messages', ContactController.getContactMessages);

export default router;
