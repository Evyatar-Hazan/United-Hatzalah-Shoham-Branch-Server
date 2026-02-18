import { PrismaClient } from '@prisma/client';

// Log environment setup for debugging
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set!');
  console.log('Available env vars:', Object.keys(process.env).filter((k) => k.includes('DATABASE') || k.includes('NEON')));
} else {
  console.log('✅ DATABASE_URL is set');
}

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

export default prisma;
