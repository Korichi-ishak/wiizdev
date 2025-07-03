import express from 'express';
import { getEmails, getEmail, createEmail, updateEmailStatus, replyToEmail, deleteEmail, markAllAsRead } from '../controllers/emailController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getEmails);
router.get('/:id', authenticateToken, requireAdmin, getEmail);
router.post('/', createEmail);
router.put('/:id/status', authenticateToken, requireAdmin, updateEmailStatus);
router.post('/:id/reply', authenticateToken, requireAdmin, replyToEmail);
router.put('/mark-all-read', authenticateToken, requireAdmin, markAllAsRead);
router.delete('/:id', authenticateToken, requireAdmin, deleteEmail);

export default router;