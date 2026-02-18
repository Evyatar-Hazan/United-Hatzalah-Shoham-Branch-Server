import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
  if (!prismaInstance) {
    const url = process.env.DATABASE_URL;
    
    if (!url) {
      const available = Object.keys(process.env)
        .filter((k) => k.toLowerCase().includes('database') || k.toLowerCase().includes('neon'))
        .join(', ');
      throw new Error(`DATABASE_URL not set. Available: ${available}`);
    }
    
    prismaInstance = new PrismaClient({
      log: ['error', 'warn'],
    });
    console.log('✅ Prisma Client initialized');
  }
  
  return prismaInstance;
};

// For backward compatibility with existing imports
const prisma = getPrismaClient();
export default prisma;
