"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', projectController_1.getProjects);
router.get('/:id', projectController_1.getProject);
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, projectController_1.createProject);
router.put('/:id', auth_1.authenticateToken, auth_1.requireAdmin, projectController_1.updateProject);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, projectController_1.deleteProject);
exports.default = router;
//# sourceMappingURL=projects.js.map