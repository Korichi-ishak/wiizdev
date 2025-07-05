"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settingsController_1 = require("../controllers/settingsController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get settings (public for contact form)
router.get('/', settingsController_1.getSettings);
// Update settings (admin only)
router.put('/', auth_1.authenticateToken, auth_1.requireAdmin, settingsController_1.updateSettings);
exports.default = router;
//# sourceMappingURL=settings.js.map