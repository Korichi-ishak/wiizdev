import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emailsApi } from '../services/api';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await emailsApi.create({
        from: formData.email,
        name: formData.name,
        subject: formData.subject,
        message: formData.message
      });
      
      setIsSubmitted(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 4000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      value: 'contact@wiizdev.com',
      description: 'Drop us a line anytime',
      action: 'mailto:contact@wiizdev.com',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: '📞',
      title: 'Call Us',
      value: '+213 541945025',
      description: 'Mon-Fri from 8am to 5pm',
      action: 'tel:+213 541945025',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      value: 'Chat with us',
      description: 'Available 24/7',
      action: '#',
      color: 'from-purple-500 to-pink-400'
    }
  ];

  const businessInfo = [
    {
      icon: '🏢',
      title: 'Office',
      details: [
        '123 Innovation Street',
        'Tech District, San Francisco',
        'CA 94105, United States'
      ]
    },
    {
      icon: '⏰',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 4:00 PM',
        'Sunday: Closed'
      ]
    },
    {
      icon: '🌐',
      title: 'Services',
      details: [
        'Web & Mobile Development',
        'UI/UX Design',
        'Cloud Solutions & DevOps'
      ]
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '99%', label: 'Client Satisfaction' },
    { number: '24h', label: 'Response Time' },
    { number: '5+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Get In
            <span className="block text-primary">Touch</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-secondary/70 dark:text-secondary-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>

        {/* Contact Methods */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.action}
              className="group bg-white dark:bg-secondary-800 rounded-3xl p-8 text-center border border-primary/20 dark:border-secondary-600 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 group-hover:text-primary transition-colors">
                {method.title}
              </h3>
              <p className="text-primary font-semibold mb-2">
                {method.value}
              </p>
              <p className="text-secondary/60 dark:text-secondary-400 text-sm">
                {method.description}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-secondary-800 rounded-3xl p-8 shadow-xl border border-primary/20 dark:border-secondary-600"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-secondary dark:text-white mb-3">
                Send us a Message
              </h2>
              <p className="text-secondary/60 dark:text-secondary-300">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="text-8xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    ✉️
                  </motion.div>
                  <h3 className="text-3xl font-bold text-primary mb-4">Message Sent!</h3>
                  <p className="text-secondary/70 dark:text-secondary-200 text-lg">
                    Thank you for reaching out. We'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-secondary dark:text-white">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-gray-50 dark:bg-secondary-700 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                        errors.name 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 dark:border-secondary-600 focus:border-primary'
                      } text-secondary dark:text-white placeholder-secondary/40 dark:placeholder-secondary-400`}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.name && (
                      <motion.p
                        className="text-red-500 text-sm flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="mr-1">⚠️</span>
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-secondary dark:text-white">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-gray-50 dark:bg-secondary-700 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                        errors.email 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 dark:border-secondary-600 focus:border-primary'
                      } text-secondary dark:text-white placeholder-secondary/40 dark:placeholder-secondary-400`}
                      placeholder="Enter your email address"
                      required
                    />
                    {errors.email && (
                      <motion.p
                        className="text-red-500 text-sm flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="mr-1">⚠️</span>
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-secondary dark:text-white">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-gray-50 dark:bg-secondary-700 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                        errors.subject 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 dark:border-secondary-600 focus:border-primary'
                      } text-secondary dark:text-white placeholder-secondary/40 dark:placeholder-secondary-400`}
                      placeholder="What's this about?"
                      required
                    />
                    {errors.subject && (
                      <motion.p
                        className="text-red-500 text-sm flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="mr-1">⚠️</span>
                        {errors.subject}
                      </motion.p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-secondary dark:text-white">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-gray-50 dark:bg-secondary-700 border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none ${
                        errors.message 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 dark:border-secondary-600 focus:border-primary'
                      } text-secondary dark:text-white placeholder-secondary/40 dark:placeholder-secondary-400`}
                      placeholder="Tell us about your project or inquiry..."
                      required
                    />
                    {errors.message && (
                      <motion.p
                        className="text-red-500 text-sm flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="mr-1">⚠️</span>
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Send Message</span>
                        <span>✈️</span>
                      </div>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Business Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white dark:bg-secondary-800 rounded-2xl p-6 text-center border border-primary/20 dark:border-secondary-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-secondary/60 dark:text-secondary-400 font-medium text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Business Info Cards */}
            {businessInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-6 border border-primary/20 dark:border-secondary-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{info.icon}</div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white">
                    {info.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-secondary/70 dark:text-secondary-200">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* FAQ */}
            <motion.div
              className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">
                Quick Questions?
              </h3>
              <div className="space-y-3">
                {[
                  { q: 'How long does a project take?', a: '2-12 weeks depending on scope' },
                  { q: 'Do you offer support after launch?', a: 'Yes, we provide ongoing support' },
                  { q: 'Can you work with our budget?', a: 'We offer flexible pricing options' }
                ].map((faq, index) => (
                  <motion.div
                    key={faq.q}
                    className="border-b border-secondary/20 pb-3 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="font-semibold text-secondary dark:text-white text-sm mb-1">
                      {faq.q}
                    </p>
                    <p className="text-secondary/70 dark:text-secondary-200 text-sm">
                      {faq.a}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;