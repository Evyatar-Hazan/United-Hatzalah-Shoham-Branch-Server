import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Log environment at request time
  console.log('[HANDLER] Request to:', req.url);
  console.log('[HANDLER] DATABASE_URL set:', !!process.env.DATABASE_URL);
  
  if (!process.env.DATABASE_URL) {
    console.error('[HANDLER] ❌ DATABASE_URL is missing!');
    const dbVars = Object.keys(process.env).filter((k) => 
      k.toLowerCase().includes('database') || 
      k.toLowerCase().includes('neon') ||
      k.toLowerCase().includes('url')
    );
    console.error('[HANDLER] Available DB-like vars:', dbVars);
    console.error('[HANDLER] Total env vars:', Object.keys(process.env).length);
  } else {
    console.log('[HANDLER] ✅ DATABASE_URL is available');
  }

  return app(req, res);
};
