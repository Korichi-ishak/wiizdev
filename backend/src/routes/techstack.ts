import express from 'express';
import { getTechStack, getTechStackItem, createTechStackItem, updateTechStackItem, deleteTechStackItem, toggleTechStackVisibility } from '../controllers/techStackController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', getTechStack);
router.get('/:id', getTechStackItem);
router.post('/', authenticateToken, requireAdmin, createTechStackItem);
router.put('/:id', authenticateToken, requireAdmin, updateTechStackItem);
router.put('/:id/toggle-visibility', authenticateToken, requireAdmin, toggleTechStackVisibility);
router.delete('/:id', authenticateToken, requireAdmin, deleteTechStackItem);

export default router;