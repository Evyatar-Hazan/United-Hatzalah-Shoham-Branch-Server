import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Ensure DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.warn(
      '[HANDLER] DATABASE_URL missing, checking alternative vars:',
      Object.keys(process.env).filter((k) => k.toLowerCase().includes('database') || k.toLowerCase().includes('neon'))
    );
  }

  // Log for debugging
  console.log('[HANDLER] DATABASE_URL exists:', !!process.env.DATABASE_URL);

  return app(req, res);
};
