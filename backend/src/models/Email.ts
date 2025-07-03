import mongoose, { Document, Schema } from 'mongoose';

export interface IEmail extends Document {
  from: string;
  name: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  replyMessage?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const emailSchema = new Schema<IEmail>({
  from: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  },
  replyMessage: {
    type: String,
    trim: true
  },
  repliedAt: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model<IEmail>('Email', emailSchema);