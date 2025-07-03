import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IEmail, {}, {}, {}, mongoose.Document<unknown, {}, IEmail, {}> & IEmail & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Email.d.ts.map