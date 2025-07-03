import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<Response | void>;

export type AsyncAuthRequestHandler = (
  req: Request & { user?: any },
  res: Response,
  next?: NextFunction
) => Promise<Response | void>;