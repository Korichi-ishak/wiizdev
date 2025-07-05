"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiiz-admin';
        console.log('🔄 Attempting to connect to MongoDB...');
        console.log('📍 MongoDB URI:', mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
        await mongoose_1.default.connect(mongoURI);
        console.log('✅ MongoDB connected successfully!');
        console.log('📊 Database:', mongoose_1.default.connection.db?.databaseName);
        console.log('🏠 Host:', mongoose_1.default.connection.host);
        console.log('🔌 Port:', mongoose_1.default.connection.port);
        // Handle connection events
        mongoose_1.default.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });
        mongoose_1.default.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        console.error('💡 Make sure MongoDB is running and the connection string is correct');
        console.error('💡 Check your .env file for MONGODB_URI configuration');
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map