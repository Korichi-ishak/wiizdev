"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const projects_1 = __importDefault(require("./routes/projects"));
const techstack_1 = __importDefault(require("./routes/techstack"));
const emails_1 = __importDefault(require("./routes/emails"));
const settings_1 = __importDefault(require("./routes/settings"));
dotenv_1.default.config();
console.log('\n🔧 Loading environment configuration...');
console.log('📁 .env file loaded:', process.env.MONGODB_URI ? '✅' : '❌');
// Connect to MongoDB
(0, database_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/auth', auth_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/techstack', techstack_1.default);
app.use('/api/emails', emails_1.default);
app.use('/api/settings', settings_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Admin API is running' });
});
app.listen(PORT, () => {
    console.log('\n🚀 Backend Server Started Successfully!');
    console.log('📡 Server running on port:', PORT);
    console.log('🌐 API Base URL: http://localhost:' + PORT + '/api');
    console.log('🔒 Environment:', process.env.NODE_ENV || 'development');
    console.log('\n📋 Available endpoints:');
    console.log('  - POST   /api/auth/login');
    console.log('  - GET    /api/projects');
    console.log('  - GET    /api/techstack');
    console.log('  - POST   /api/emails');
    console.log('  - GET    /api/settings');
    console.log('  - GET    /api/health');
    console.log('\n✨ Ready to accept requests!\n');
});
//# sourceMappingURL=index.js.map