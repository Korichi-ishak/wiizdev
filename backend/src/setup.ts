import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/database';
import Admin from './models/Admin';
import TechStack from './models/TechStack';
import Project from './models/Project';

dotenv.config();

const migrateTechStackVisibility = async () => {
  try {
    console.log('🔄 Migrating tech stack visibility field...');
    
    // Update all tech stack items that don't have the visible field
    const result = await TechStack.updateMany(
      { visible: { $exists: false } },
      { $set: { visible: true } }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} tech stack items with visibility field`);
  } catch (error) {
    console.error('❌ Failed to migrate tech stack visibility:', error);
  }
};

const setupDefaultData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Run migrations first
    await migrateTechStackVisibility();

    // Create default admin if none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const defaultAdmin = new Admin({
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin'
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin created:');
      console.log('   Email: admin@example.com');
      console.log('   Password: admin123');
    } else {
      console.log('⚠️  Admin users already exist');
    }

    // Create sample tech stack items
    const techStackCount = await TechStack.countDocuments();
    if (techStackCount === 0) {
      const sampleTechStack = [
        {
          name: 'React',
          category: 'frontend',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
          color: '#61DAFB',
          description: 'A JavaScript library for building user interfaces',
          logoUrl: 'https://reactjs.org/logo-og.png',
          officialWebsite: 'https://reactjs.org',
          visible: true
        },
        {
          name: 'Node.js',
          category: 'backend',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
          color: '#339933',
          description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
          logoUrl: 'https://nodejs.org/static/images/logo.svg',
          officialWebsite: 'https://nodejs.org',
          visible: true
        },
        {
          name: 'MongoDB',
          category: 'database',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
          color: '#47A248',
          description: 'Document-oriented NoSQL database',
          logoUrl: 'https://www.mongodb.com/assets/images/global/favicon.ico',
          officialWebsite: 'https://www.mongodb.com',
          visible: true
        },
        {
          name: 'TypeScript',
          category: 'frontend',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
          color: '#3178C6',
          description: 'Typed superset of JavaScript that compiles to plain JavaScript',
          logoUrl: 'https://www.typescriptlang.org/favicon-32x32.png',
          officialWebsite: 'https://www.typescriptlang.org',
          visible: true
        },
        {
          name: 'Docker',
          category: 'devops',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
          color: '#2496ED',
          description: 'Platform for developing, shipping, and running applications',
          logoUrl: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
          officialWebsite: 'https://www.docker.com',
          visible: true
        }
      ];

      await TechStack.insertMany(sampleTechStack);
      console.log('✅ Sample tech stack items created');
    } else {
      console.log('⚠️  Tech stack items already exist');
    }

    // Create sample projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const sampleProjects = [
        {
          title: 'E-Commerce Platform',
          description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
          thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
          link: 'https://github.com/example/ecommerce',
          techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
          category: 'Web Development',
          status: 'published'
        },
        {
          title: 'Task Management App',
          description: 'Collaborative task management application with real-time updates',
          thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
          link: 'https://github.com/example/taskmanager',
          techStack: ['React', 'Node.js', 'Socket.io'],
          category: 'Productivity',
          status: 'published'
        },
        {
          title: 'Weather Dashboard',
          description: 'Weather monitoring dashboard with data visualization',
          thumbnail: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
          link: 'https://github.com/example/weather',
          techStack: ['React', 'Chart.js', 'APIs'],
          category: 'Data Visualization',
          status: 'draft'
        }
      ];

      await Project.insertMany(sampleProjects);
      console.log('✅ Sample projects created');
    } else {
      console.log('⚠️  Projects already exist');
    }

    console.log('\n🎉 Setup completed successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Login to admin panel: http://localhost:3000/admin/login');
    console.log('3. Use credentials: admin@example.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
};

setupDefaultData();