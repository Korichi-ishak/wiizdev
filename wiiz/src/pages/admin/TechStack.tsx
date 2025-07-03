import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import AdminNavigation from '../../components/AdminNavigation';
import { techStackApi, type TechStack } from '../../services/api';

const AdminTechStack: React.FC = () => {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<TechStack | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend' as 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other',
    icon: '',
    color: '#000000',
    description: '',
    logoUrl: '',
    officialWebsite: '',
    visible: true
  });

  useEffect(() => {
    loadTechStack();
  }, []);

  const loadTechStack = async () => {
    try {
      const data = await techStackApi.getAll(true); // Include hidden items for admin
      setTechStack(data);
    } catch (error) {
      console.error('Failed to load tech stack:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await techStackApi.update(editingItem._id, formData);
      } else {
        await techStackApi.create(formData);
      }
      loadTechStack();
      resetForm();
    } catch (error) {
      console.error('Failed to save tech stack item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tech stack item?')) {
      try {
        await techStackApi.delete(id);
        loadTechStack();
      } catch (error) {
        console.error('Failed to delete tech stack item:', error);
      }
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      await techStackApi.toggleVisibility(id);
      loadTechStack();
    } catch (error) {
      console.error('Failed to toggle tech stack visibility:', error);
    }
  };

  const handleEdit = (item: TechStack) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      icon: item.icon,
      color: item.color,
      description: item.description,
      logoUrl: item.logoUrl,
      officialWebsite: item.officialWebsite,
      visible: item.visible
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'frontend',
      icon: '',
      color: '#000000',
      description: '',
      logoUrl: '',
      officialWebsite: '',
      visible: true
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  const filteredTechStack = techStack.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryColors = {
    frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    backend: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    database: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    devops: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
    mobile: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tech Stack Management
          </h1>
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Tech Stack</span>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tech stack..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {editingItem ? 'Edit Tech Stack Item' : 'Add New Tech Stack Item'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other' })}
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="devops">DevOps</option>
                      <option value="mobile">Mobile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Icon URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      />
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.logoUrl}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Official Website
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.officialWebsite}
                      onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={formData.visible}
                        onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Show on website
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingItem ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechStack.map((item) => (
            <div key={item._id} className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 ${
              item.visible ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {item.icon && (
                    <img src={item.icon} alt={item.name} className="w-8 h-8" />
                  )}
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.visible 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {item.visible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleVisibility(item._id)}
                    title={`${item.visible ? 'Hide' : 'Show'} ${item.name} on website`}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.visible ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.visible ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
              </div>
              {item.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {item.description}
                </p>
              )}
              <div className="space-y-2">
                {item.logoUrl && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Logo:</span>
                    <img src={item.logoUrl} alt={`${item.name} logo`} className="w-6 h-6" />
                  </div>
                )}
                {item.officialWebsite && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Website:</span>
                    <a 
                      href={item.officialWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate"
                    >
                      {item.officialWebsite.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTechStack.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No tech stack items found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTechStack;