"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/login', authController_1.login);
router.post('/admin', auth_1.authenticateToken, auth_1.requireAdmin, authController_1.createAdmin);
exports.default = router;
//# sourceMappingURL=auth.js.map