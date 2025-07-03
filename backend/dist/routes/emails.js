"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailController_1 = require("../controllers/emailController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', auth_1.authenticateToken, auth_1.requireAdmin, emailController_1.getEmails);
router.get('/:id', auth_1.authenticateToken, auth_1.requireAdmin, emailController_1.getEmail);
router.post('/', emailController_1.createEmail);
router.put('/:id/status', auth_1.authenticateToken, auth_1.requireAdmin, emailController_1.updateEmailStatus);
router.post('/:id/reply', auth_1.authenticateToken, auth_1.requireAdmin, emailController_1.replyToEmail);
router.put('/mark-all-read', auth_1.authenticateToken, auth_1.requireAdmin, emailController_1.markAllAsRead);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, emailController_1.deleteEmail);
exports.default = router;
//# sourceMappingURL=emails.js.map