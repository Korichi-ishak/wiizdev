import express from 'express';
import { login, createAdmin } from '../controllers/authController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/admin', authenticateToken, requireAdmin, createAdmin);

export default router;