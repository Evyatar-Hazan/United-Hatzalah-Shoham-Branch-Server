import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// Load .env.production if DATABASE_URL is not set
if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('postgresql://')) {
  const envPath = path.join(__dirname, '../../.env.production');
  if (fs.existsSync(envPath)) {
    console.log('[Prisma] Loading .env.production because DATABASE_URL is invalid or missing');
    require('dotenv').config({ path: envPath });
  }
}

let prismaInstance: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
  if (!prismaInstance) {
    const url = process.env.DATABASE_URL;
    
    if (!url || !url.startsWith('postgresql://')) {
      throw new Error(
        `[Prisma] Invalid or missing DATABASE_URL: ${url?.substring(0, 50) || 'NOT SET'}. ` +
        `Expected postgresql:// or postgres:// URL.`
      );
    }
    
    prismaInstance = new PrismaClient({
      log: ['error', 'warn'],
    });
    console.log('[Prisma] ✅ Client initialized successfully');
  }
  
  return prismaInstance;
};

// For backward compatibility
const prisma = getPrismaClient();
export default prisma;
