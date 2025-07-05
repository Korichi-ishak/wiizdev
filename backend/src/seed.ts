import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/database';
import Admin from './models/Admin';
import TechStack from './models/TechStack';
import Project from './models/Project';
import Settings from './models/Settings';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log('🔄 Starting database seeding...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Admin.deleteMany({});
    await TechStack.deleteMany({});
    await Project.deleteMany({});
    await Settings.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create admin users
    console.log('👤 Creating admin users...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admins = [
      {
        email: 'admin@wiizdev.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin'
      },
      {
        email: 'super@wiizdev.com',
        password: await bcrypt.hash('super123', 10),
        name: 'Super Admin',
        role: 'super_admin'
      }
    ];
    await Admin.insertMany(admins);
    console.log('✅ Admin users created');
    console.log('   - Email: admin@wiizdev.com | Password: admin123');
    console.log('   - Email: super@wiizdev.com | Password: super123\n');

    // Create tech stack
    console.log('🛠️  Creating tech stack...');
    const techStackData = [
      // Frontend
      {
        name: 'React',
        category: 'frontend',
        icon: '⚛️',
        color: 'from-cyan-400 to-blue-500',
        description: 'A JavaScript library for building user interfaces with component-based architecture',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        officialWebsite: 'https://react.dev'
      },
      {
        name: 'Next.js',
        category: 'frontend',
        icon: '▲',
        color: 'from-gray-700 to-black',
        description: 'The React Framework for Production - featuring hybrid static & server rendering',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        officialWebsite: 'https://nextjs.org'
      },
      {
        name: 'Vue.js',
        category: 'frontend',
        icon: '🟢',
        color: 'from-green-400 to-emerald-600',
        description: 'Progressive JavaScript framework for building interactive web interfaces',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        officialWebsite: 'https://vuejs.org'
      },
      {
        name: 'TypeScript',
        category: 'frontend',
        icon: '📘',
        color: 'from-blue-400 to-blue-600',
        description: 'Typed superset of JavaScript that compiles to plain JavaScript',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        officialWebsite: 'https://www.typescriptlang.org'
      },
      {
        name: 'Tailwind CSS',
        category: 'frontend',
        icon: '🎨',
        color: 'from-cyan-400 to-teal-600',
        description: 'Utility-first CSS framework for rapid UI development',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
        officialWebsite: 'https://tailwindcss.com'
      },

      // Backend
      {
        name: 'Node.js',
        category: 'backend',
        icon: '🟩',
        color: 'from-green-500 to-green-700',
        description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        officialWebsite: 'https://nodejs.org'
      },
      {
        name: 'Express.js',
        category: 'backend',
        icon: '🚂',
        color: 'from-gray-600 to-gray-800',
        description: 'Fast, unopinionated, minimalist web framework for Node.js',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        officialWebsite: 'https://expressjs.com'
      },
      {
        name: 'Python',
        category: 'backend',
        icon: '🐍',
        color: 'from-blue-500 to-yellow-500',
        description: 'High-level programming language with emphasis on code readability',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        officialWebsite: 'https://www.python.org'
      },
      {
        name: 'Django',
        category: 'backend',
        icon: '🎸',
        color: 'from-green-600 to-green-800',
        description: 'High-level Python web framework that encourages rapid development',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
        officialWebsite: 'https://www.djangoproject.com'
      },
      {
        name: 'GraphQL',
        category: 'backend',
        icon: '🔷',
        color: 'from-pink-500 to-purple-600',
        description: 'Query language for APIs and runtime for executing queries',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
        officialWebsite: 'https://graphql.org'
      },

      // Database
      {
        name: 'MongoDB',
        category: 'database',
        icon: '🍃',
        color: 'from-green-400 to-green-600',
        description: 'Document-oriented NoSQL database for modern applications',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        officialWebsite: 'https://www.mongodb.com'
      },
      {
        name: 'PostgreSQL',
        category: 'database',
        icon: '🐘',
        color: 'from-blue-400 to-blue-700',
        description: 'Powerful, open source object-relational database system',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        officialWebsite: 'https://www.postgresql.org'
      },
      {
        name: 'MySQL',
        category: 'database',
        icon: '🐬',
        color: 'from-orange-400 to-blue-600',
        description: 'Popular open-source relational database management system',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        officialWebsite: 'https://www.mysql.com'
      },
      {
        name: 'Redis',
        category: 'database',
        icon: '🔴',
        color: 'from-red-500 to-red-700',
        description: 'In-memory data structure store used as database and cache',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
        officialWebsite: 'https://redis.io'
      },

      // DevOps
      {
        name: 'Docker',
        category: 'devops',
        icon: '🐳',
        color: 'from-blue-400 to-blue-600',
        description: 'Platform for developing, shipping, and running applications in containers',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        officialWebsite: 'https://www.docker.com'
      },
      {
        name: 'Kubernetes',
        category: 'devops',
        icon: '☸️',
        color: 'from-blue-500 to-blue-700',
        description: 'Open-source container orchestration platform for automating deployment',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
        officialWebsite: 'https://kubernetes.io'
      },
      {
        name: 'AWS',
        category: 'devops',
        icon: '☁️',
        color: 'from-orange-400 to-orange-600',
        description: 'Comprehensive cloud computing platform by Amazon',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
        officialWebsite: 'https://aws.amazon.com'
      },
      {
        name: 'GitHub Actions',
        category: 'devops',
        icon: '🔄',
        color: 'from-gray-700 to-black',
        description: 'CI/CD platform integrated with GitHub for automating workflows',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        officialWebsite: 'https://github.com/features/actions'
      },

      // Mobile
      {
        name: 'React Native',
        category: 'mobile',
        icon: '📱',
        color: 'from-cyan-400 to-blue-500',
        description: 'Framework for building native mobile apps using React',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        officialWebsite: 'https://reactnative.dev'
      },
      {
        name: 'Flutter',
        category: 'mobile',
        icon: '🦋',
        color: 'from-blue-400 to-blue-600',
        description: 'Google\'s UI toolkit for building natively compiled applications',
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
        officialWebsite: 'https://flutter.dev'
      }
    ];

    const createdTechStack = await TechStack.insertMany(techStackData);
    console.log(`✅ ${createdTechStack.length} tech stack items created\n`);

    // Create projects
    console.log('📁 Creating projects...');
    const projectsData = [
      {
        title: 'E-Commerce Platform',
        description: 'A modern full-stack e-commerce platform with real-time inventory management, secure payment processing, and responsive design. Features include user authentication, product search, shopping cart, and order tracking.',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/ecommerce-platform',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TypeScript'],
        category: 'Web Application',
        status: 'published'
      },
      {
        title: 'Task Management System',
        description: 'Collaborative task management application with real-time updates, team collaboration features, and advanced analytics. Includes Kanban boards, time tracking, and automated workflows.',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/task-manager',
        techStack: ['Next.js', 'Express.js', 'PostgreSQL', 'Socket.io', 'Redis'],
        category: 'Productivity',
        status: 'published'
      },
      {
        title: 'Healthcare Portal',
        description: 'Comprehensive healthcare management system for clinics and hospitals. Features patient records, appointment scheduling, prescription management, and telemedicine capabilities.',
        thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/healthcare-portal',
        techStack: ['Vue.js', 'Django', 'PostgreSQL', 'Docker', 'AWS'],
        category: 'Healthcare',
        status: 'published'
      },
      {
        title: 'Financial Dashboard',
        description: 'Real-time financial analytics dashboard with data visualization, portfolio tracking, and automated reporting. Integrates with multiple financial APIs for comprehensive market analysis.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/financial-dashboard',
        techStack: ['React', 'Python', 'MongoDB', 'Chart.js', 'GraphQL'],
        category: 'Finance',
        status: 'published'
      },
      {
        title: 'Social Media Analytics',
        description: 'Advanced social media monitoring and analytics platform. Track engagement, sentiment analysis, and competitor insights across multiple platforms.',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/social-analytics',
        techStack: ['Next.js', 'Node.js', 'Redis', 'Elasticsearch', 'Docker'],
        category: 'Analytics',
        status: 'published'
      },
      {
        title: 'Learning Management System',
        description: 'Comprehensive e-learning platform with course creation tools, student progress tracking, and interactive content delivery. Supports video streaming and real-time collaboration.',
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/lms-platform',
        techStack: ['React', 'Express.js', 'MongoDB', 'WebRTC', 'AWS'],
        category: 'Education',
        status: 'published'
      },
      {
        title: 'IoT Dashboard',
        description: 'Real-time IoT device monitoring and control system. Visualize sensor data, manage device configurations, and set up automated alerts and actions.',
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/iot-dashboard',
        techStack: ['Vue.js', 'Node.js', 'InfluxDB', 'MQTT', 'Docker'],
        category: 'IoT',
        status: 'published'
      },
      {
        title: 'Restaurant Management',
        description: 'Complete restaurant management solution with POS integration, inventory tracking, online ordering, and customer relationship management.',
        thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/restaurant-manager',
        techStack: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
        category: 'Hospitality',
        status: 'published'
      },
      {
        title: 'Real Estate Platform',
        description: 'Modern real estate listing and management platform with virtual tours, advanced search filters, and integrated messaging system.',
        thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/real-estate',
        techStack: ['Next.js', 'Django', 'PostgreSQL', 'Mapbox', 'AWS'],
        category: 'Real Estate',
        status: 'published'
      },
      {
        title: 'Fitness Tracking App',
        description: 'Mobile-first fitness application with workout planning, progress tracking, nutrition monitoring, and social features for community engagement.',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/fitness-tracker',
        techStack: ['Flutter', 'Node.js', 'MongoDB', 'Firebase', 'TensorFlow'],
        category: 'Health & Fitness',
        status: 'published'
      },
      {
        title: 'Inventory Management',
        description: 'Enterprise-grade inventory management system with barcode scanning, automated reordering, and multi-warehouse support.',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/inventory-system',
        techStack: ['React', 'Express.js', 'MySQL', 'Redis', 'Docker'],
        category: 'Enterprise',
        status: 'published'
      },
      {
        title: 'Video Streaming Platform',
        description: 'Scalable video streaming service with adaptive bitrate streaming, content recommendation engine, and live streaming capabilities.',
        thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=600&fit=crop',
        link: 'https://github.com/wiizdev/video-platform',
        techStack: ['Next.js', 'Node.js', 'MongoDB', 'HLS.js', 'AWS'],
        category: 'Media',
        status: 'published'
      }
    ];

    const createdProjects = await Project.insertMany(projectsData);
    console.log(`✅ ${createdProjects.length} projects created\n`);

    // Create default settings
    console.log('⚙️  Creating default settings...');
    const settingsData = {
      contactEmail: 'contact@wiizdev.com',
      contactPhone: '+213 541945025',
      contactAddress: '123 Tech Street, Silicon Valley, CA 94025',
      socialLinks: {
        facebook: 'https://facebook.com/wiizdev',
        twitter: 'https://twitter.com/wiizdev',
        linkedin: 'https://linkedin.com/company/wiizdev',
        github: 'https://github.com/wiizdev',
        instagram: 'https://instagram.com/wiizdev'
      },
      emailNotifications: {
        enabled: true,
        recipientEmails: ['admin@wiizdev.com', 'contact@wiizdev.com']
      },
      autoReplyMessage: 'Thank you for contacting Wiiz Dev! We have received your message and will respond within 24 hours. For urgent matters, please call us directly.',
      businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM PST\nSaturday: 10:00 AM - 4:00 PM PST\nSunday: Closed'
    };
    
    await Settings.create(settingsData);
    console.log('✅ Default settings created\n');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - ${admins.length} admin users created`);
    console.log(`   - ${createdTechStack.length} tech stack items created`);
    console.log(`   - ${createdProjects.length} projects created`);
    console.log(`   - 1 settings configuration created`);
    console.log('\n🚀 You can now start the application and login with the admin credentials above.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();