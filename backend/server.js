const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

console.log('\n🔧 Loading environment configuration...');
console.log('📁 .env file loaded:', process.env.MONGODB_URI ? '✅' : '❌');

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiiz-admin';
    
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 MongoDB URI:', mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database:', mongoose.connection.db?.databaseName);
    console.log('🏠 Host:', mongoose.connection.host);
    console.log('🔌 Port:', mongoose.connection.port);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.error('💡 Make sure MongoDB is running and the connection string is correct');
    console.error('💡 Check your .env file for MONGODB_URI configuration');
    process.exit(1);
  }
};

// Import routes
const authRoutes = require('./dist/routes/auth').default;
const projectRoutes = require('./dist/routes/projects').default;
const techStackRoutes = require('./dist/routes/techstack').default;
const emailRoutes = require('./dist/routes/emails').default;
const settingsRoutes = require('./dist/routes/settings').default;

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://wiizdev.com', 'https://www.wiizdev.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/techstack', techStackRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'WiizDev API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'WiizDev Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      techstack: '/api/techstack',
      emails: '/api/emails',
      settings: '/api/settings',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log('\n🚀 WiizDev Backend Server Started Successfully!');
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

module.exports = app; 