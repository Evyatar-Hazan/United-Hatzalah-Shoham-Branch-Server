import { VercelRequest, VercelResponse } from '@vercel/node';

export default (_req: VercelRequest, res: VercelResponse) => {
  const dbVars = Object.keys(process.env).filter((k) =>
    k.toLowerCase().includes('database') ||
    k.toLowerCase().includes('neon') ||
    k.toLowerCase().includes('url')
  );

  const allVars = Object.keys(process.env).sort();

  res.json({
    database_url: process.env.DATABASE_URL || 'NOT SET',
    frontend_url: process.env.FRONTEND_URL || 'NOT SET',
    node_env: process.env.NODE_ENV,
    dbVars,
    totalEnvVars: allVars.length,
    allVars: allVars.slice(0, 20), // First 20 for debugging
  });
};
