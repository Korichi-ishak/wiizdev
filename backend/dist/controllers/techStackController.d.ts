import { Request, Response } from 'express';
export declare const getTechStack: (req: Request, res: Response) => Promise<void>;
export declare const getTechStackItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createTechStackItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTechStackItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTechStackItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=techStackController.d.ts.map