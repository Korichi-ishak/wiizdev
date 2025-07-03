import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import AdminNavigation from '../../components/AdminNavigation';
import { 
  LogOut, 
  Plus, 
  Mail, 
  Code, 
  FolderOpen, 
  TrendingUp, 
  Users, 
  Eye, 
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle
} from 'lucide-react';
import { projectsApi, emailsApi, techStackApi } from '../../services/api';

interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalTechStack: number;
  totalEmails: number;
  unreadEmails: number;
  recentProjects: number;
  recentEmails: number;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    publishedProjects: 0,
    totalTechStack: 0,
    totalEmails: 0,
    unreadEmails: 0,
    recentProjects: 0,
    recentEmails: 0
  });
  const [loading, setLoading] = useState(true);
  const [showTechStack, setShowTechStack] = useState(true);
  const [techStackData, setTechStackData] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [projects, emails, techStack] = await Promise.all([
        projectsApi.getAll(),
        emailsApi.getAll(),
        techStackApi.getAll(true) // Include hidden items for admin dashboard
      ]);

      const now = new Date();
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const recentProjects = projects.filter(p => new Date(p.createdAt) > lastWeek).length;
      const recentEmails = emails.filter(e => new Date(e.createdAt) > lastWeek).length;

      setStats({
        totalProjects: projects.length,
        publishedProjects: projects.filter(p => p.status === 'published').length,
        totalTechStack: techStack.length,
        totalEmails: emails.length,
        unreadEmails: emails.filter(e => e.status === 'unread').length,
        recentProjects,
        recentEmails
      });
      
      setTechStackData(techStack);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (techId: string) => {
    try {
      await techStackApi.toggleVisibility(techId);
      // Reload data to reflect changes
      loadDashboardData();
    } catch (error) {
      console.error('Failed to toggle tech stack visibility:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      description: `${stats.publishedProjects} published`,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: stats.recentProjects > 0 ? `+${stats.recentProjects} this week` : 'No new projects',
      trend: stats.recentProjects > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Tech Stack Items',
      value: stats.totalTechStack,
      description: 'Technologies tracked',
      icon: Code,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: 'Active technologies',
      trend: 'neutral'
    },
    {
      title: 'Email Messages',
      value: stats.totalEmails,
      description: `${stats.unreadEmails} unread`,
      icon: Mail,
      color: stats.unreadEmails > 0 ? 'text-red-600' : 'text-gray-600',
      bgColor: stats.unreadEmails > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-900/20',
      change: stats.recentEmails > 0 ? `+${stats.recentEmails} this week` : 'No new emails',
      trend: stats.recentEmails > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Weekly Activity',
      value: stats.recentProjects + stats.recentEmails,
      description: 'Projects + Emails',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: 'Combined activity',
      trend: 'up'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Project',
      description: 'Add a new project to your portfolio',
      icon: Plus,
      href: '/admin/projects',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Manage Tech Stack',
      description: 'Update your technology stack',
      icon: Code,
      href: '/admin/techstack',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Check Messages',
      description: `${stats.unreadEmails} unread messages`,
      icon: Mail,
      href: '/admin/emails',
      color: stats.unreadEmails > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 dark:text-gray-300">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <AdminNavigation />
      
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  Here's what's happening with your portfolio
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last login</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.trend === 'up' && (
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  )}
                  {stat.trend === 'down' && (
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Manage your portfolio content efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.href} className="block">
                      <div className={`${action.color} rounded-lg p-6 text-white hover:scale-105 transition-transform duration-200 cursor-pointer`}>
                        <action.icon className="h-8 w-8 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                      <FolderOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Projects Overview
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stats.totalProjects} total projects, {stats.publishedProjects} published
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
                      <Code className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Tech Stack Updated
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stats.totalTechStack} technologies configured
                      </p>
                    </div>
                  </div>
                  
                  {stats.unreadEmails > 0 && (
                    <div className="flex items-start space-x-3">
                      <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                        <Mail className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          New Messages
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {stats.unreadEmails} unread message{stats.unreadEmails !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        System Status
                      </p>
                      <p className="text-xs text-green-600">
                        All systems operational
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tech Stack Toggle & Display */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Tech Stack Overview</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Show Tech Stack</span>
                  <button
                    onClick={() => setShowTechStack(!showTechStack)}
                    title={`${showTechStack ? 'Hide' : 'Show'} tech stack section`}
                    aria-label={`${showTechStack ? 'Hide' : 'Show'} tech stack section`}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showTechStack ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showTechStack ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </CardTitle>
              <CardDescription>
                Manage and view your technology stack
              </CardDescription>
            </CardHeader>
            {showTechStack && (
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {techStackData.map((tech, index) => (
                    <div
                      key={tech._id}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 ${
                        !tech.visible ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        {/* Icon/Logo */}
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                          {(() => {
                            const imageUrl = tech.logoUrl || tech.icon;
                            const isImageUrl = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/'));
                            
                            if (isImageUrl) {
                              return (
                                <img 
                                  src={imageUrl} 
                                  alt={`${tech.name} logo`}
                                  className="w-6 h-6 object-contain"
                                  onError={(e) => {
                                    // Fallback to icon text if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                    if (nextSibling) {
                                      nextSibling.style.display = 'block';
                                    }
                                  }}
                                />
                              );
                            }
                            return null;
                          })()}
                          <span 
                            className={`text-lg ${(() => {
                              const imageUrl = tech.logoUrl || tech.icon;
                              const isImageUrl = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/'));
                              return isImageUrl ? 'hidden' : 'block';
                            })()}`}
                          >
                            {tech.icon && !tech.icon.startsWith('http') && !tech.icon.startsWith('/') ? tech.icon : '🔧'}
                          </span>
                        </div>

                        {/* Technology Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                              {tech.name}
                            </h4>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              tech.category === 'frontend' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                              tech.category === 'backend' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                              tech.category === 'database' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' :
                              tech.category === 'devops' ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
                              tech.category === 'mobile' ? 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                            }`}>
                              {tech.category}
                            </span>
                          </div>
                          {tech.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                              {tech.description}
                            </p>
                          )}
                        </div>

                        {/* Visibility Status */}
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            tech.visible 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {tech.visible ? '👁️ Visible' : '🚫 Hidden'}
                          </span>
                          
                          {/* Toggle Switch */}
                          <button
                            onClick={() => handleToggleVisibility(tech._id)}
                            title={`${tech.visible ? 'Hide' : 'Show'} ${tech.name} on website`}
                            aria-label={`${tech.visible ? 'Hide' : 'Show'} ${tech.name} on website`}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                              tech.visible ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                tech.visible ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {techStackData.length === 0 && (
                  <div className="text-center py-12">
                    <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No tech stack items found</p>
                    <Link
                      to="/admin/techstack"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Technology
                    </Link>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>

        {/* System Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>System Overview</span>
              </CardTitle>
              <CardDescription>
                Performance and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {((stats.publishedProjects / stats.totalProjects) * 100 || 0).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Projects Published
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {stats.totalTechStack}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Technologies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {stats.recentProjects + stats.recentEmails}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Weekly Activity
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;