import mongoose, { Document } from 'mongoose';
export interface ITechStack extends Document {
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
    icon: string;
    color: string;
    description: string;
    logoUrl: string;
    officialWebsite: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ITechStack, {}, {}, {}, mongoose.Document<unknown, {}, ITechStack, {}> & ITechStack & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=TechStack.d.ts.map