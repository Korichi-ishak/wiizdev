import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Get settings (public for contact form)
router.get('/', getSettings);

// Update settings (admin only)
router.put('/', authenticateToken, requireAdmin, updateSettings);

export default router;