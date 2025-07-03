"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.saveFile = exports.ensureUploadDir = exports.uploadDir = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
exports.uploadDir = path_1.default.join(process.cwd(), 'uploads');
const ensureUploadDir = async () => {
    try {
        await promises_1.default.access(exports.uploadDir);
    }
    catch {
        await promises_1.default.mkdir(exports.uploadDir, { recursive: true });
    }
};
exports.ensureUploadDir = ensureUploadDir;
const saveFile = async (filename, data) => {
    await (0, exports.ensureUploadDir)();
    const filepath = path_1.default.join(exports.uploadDir, filename);
    await promises_1.default.writeFile(filepath, data);
    return filepath;
};
exports.saveFile = saveFile;
const deleteFile = async (filename) => {
    const filepath = path_1.default.join(exports.uploadDir, filename);
    try {
        await promises_1.default.unlink(filepath);
    }
    catch (error) {
        console.error('Error deleting file:', error);
    }
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=storage.js.map