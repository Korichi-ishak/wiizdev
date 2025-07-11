import { Request, Response } from 'express';
export declare const getEmails: (req: Request, res: Response) => Promise<void>;
export declare const getEmail: (req: Request, res: Response) => Promise<void>;
export declare const createEmail: (req: Request, res: Response) => Promise<void>;
export declare const updateEmailStatus: (req: Request, res: Response) => Promise<void>;
export declare const replyToEmail: (req: Request, res: Response) => Promise<void>;
export declare const deleteEmail: (req: Request, res: Response) => Promise<void>;
export declare const markAllAsRead: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=emailController.d.ts.map