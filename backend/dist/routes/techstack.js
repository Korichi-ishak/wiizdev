"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const techStackController_1 = require("../controllers/techStackController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', techStackController_1.getTechStack);
router.get('/:id', techStackController_1.getTechStackItem);
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, techStackController_1.createTechStackItem);
router.put('/:id', auth_1.authenticateToken, auth_1.requireAdmin, techStackController_1.updateTechStackItem);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, techStackController_1.deleteTechStackItem);
exports.default = router;
//# sourceMappingURL=techstack.js.map