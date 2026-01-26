import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

const router = Router();

router.post('/', ContactController.submitContactMessage);
router.get('/messages', ContactController.getContactMessages);

export default router;
