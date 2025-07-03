import mongoose, { Document, Schema } from 'mongoose';

export interface ITechStack extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  icon: string;
  color: string;
  description: string;
  logoUrl: string;
  officialWebsite: string;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const techStackSchema = new Schema<ITechStack>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'devops', 'mobile', 'other']
  },
  icon: {
    type: String,
    trim: true,
    default: ''
  },
  color: {
    type: String,
    trim: true,
    default: '#000000'
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  logoUrl: {
    type: String,
    trim: true,
    default: ''
  },
  officialWebsite: {
    type: String,
    trim: true,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ITechStack>('TechStack', techStackSchema);