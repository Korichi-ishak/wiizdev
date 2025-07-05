import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ISettings, {}, {}, {}, mongoose.Document<unknown, {}, ISettings, {}> & ISettings & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Settings.d.ts.map