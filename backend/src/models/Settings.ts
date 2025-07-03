import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  contactEmail: string;
  contactPhone?: string;
  contactAddress?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  emailNotifications: {
    enabled: boolean;
    recipientEmails: string[];
  };
  autoReplyMessage?: string;
  businessHours?: string;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
  contactEmail: {
    type: String,
    required: true,
    default: 'contact@wiizdev.com'
  },
  contactPhone: {
    type: String,
    default: ''
  },
  contactAddress: {
    type: String,
    default: ''
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  emailNotifications: {
    enabled: { type: Boolean, default: true },
    recipientEmails: { 
      type: [String], 
      default: ['admin@wiizdev.com'] 
    }
  },
  autoReplyMessage: {
    type: String,
    default: 'Thank you for contacting Wiiz Dev. We have received your message and will get back to you within 24 hours.'
  },
  businessHours: {
    type: String,
    default: 'Monday - Friday: 9:00 AM - 6:00 PM'
  }
}, {
  timestamps: true
});

export default mongoose.model<ISettings>('Settings', SettingsSchema);