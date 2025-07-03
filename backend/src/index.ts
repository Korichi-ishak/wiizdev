import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database';

import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import techStackRoutes from './routes/techstack';
import emailRoutes from './routes/emails';
import settingsRoutes from './routes/settings';

dotenv.config();

console.log('\n🔧 Loading environment configuration...');
console.log('📁 .env file loaded:', process.env.MONGODB_URI ? '✅' : '❌');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/techstack', techStackRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/settings', settingsRoutes);

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