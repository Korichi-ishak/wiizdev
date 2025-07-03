import React, { useState, useEffect } from 'react';
import { Mail, Search, Reply, Trash2, MailOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import AdminNavigation from '../../components/AdminNavigation';
import { emailsApi, type Email } from '../../services/api';

const AdminEmails: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      const data = await emailsApi.getAll();
      setEmails(data);
    } catch (error) {
      console.error('Failed to load emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (email: Email) => {
    if (email.status === 'unread') {
      try {
        await emailsApi.updateStatus(email.id, 'read');
        loadEmails();
      } catch (error) {
        console.error('Failed to mark email as read:', error);
      }
    }
    setSelectedEmail(email);
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmail || !replyMessage.trim()) return;

    try {
      await emailsApi.reply(selectedEmail._id, replyMessage);
      loadEmails();
      setReplyMessage('');
      setShowReplyForm(false);
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this email?')) {
      try {
        await emailsApi.delete(id);
        loadEmails();
        if (selectedEmail?._id === id) {
          setSelectedEmail(null);
        }
      } catch (error) {
        console.error('Failed to delete email:', error);
      }
    }
  };

  const filteredEmails = emails.filter(email =>
    email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Email['status']) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'read':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'replied':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
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
            Email Management
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {emails.filter(e => e.status === 'unread').length} unread
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Inbox ({filteredEmails.length})
              </h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredEmails.map((email) => (
                <div
                  key={email._id}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedEmail?._id === email._id ? 'bg-blue-50 dark:bg-blue-900' : ''
                  } ${email.status === 'unread' ? 'font-semibold' : ''}`}
                  onClick={() => handleMarkAsRead(email)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {email.status === 'unread' && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {email.name} ({email.from})
                        </p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(email.status)}`}>
                          {email.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white truncate mb-1">
                        {email.subject}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {email.message.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(email.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(email._id);
                      }}
                      className="text-red-600 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {filteredEmails.length === 0 && (
              <div className="p-8 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No emails found</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {selectedEmail ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedEmail.subject}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        From: {selectedEmail.name} ({selectedEmail.from})
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(selectedEmail.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        disabled={selectedEmail.status === 'replied'}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-gray-900 dark:text-white">
                      {selectedEmail.message}
                    </p>
                  </div>
                </div>
                {showReplyForm && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleReply} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Reply Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Type your reply..."
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowReplyForm(false);
                            setReplyMessage('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Send Reply</Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <MailOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Select an email to view its content
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmails;