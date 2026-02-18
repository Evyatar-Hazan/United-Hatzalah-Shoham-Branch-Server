import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Log environment at handler level
  console.log('[HANDLER] DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('[HANDLER] DATABASE_URL first 50 chars:', process.env.DATABASE_URL?.substring(0, 50));
  
  return app(req, res);
};
