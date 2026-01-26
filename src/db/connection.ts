import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  // If no MongoDB URI provided, skip database connection
  // This allows development with in-memory storage
  if (!MONGODB_URI) {
    console.log('⚠️  No MongoDB URI configured. Using in-memory storage for development.');
    console.log('   To enable database persistence:');
    console.log('   1. Set MONGODB_URI in .env with your MongoDB Atlas connection string');
    console.log('   2. Visit https://www.mongodb.com/cloud/atlas to create a free cluster');
    console.log(
      '   3. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/database',
    );
    isConnected = false;
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed. Falling back to in-memory storage.');
    console.warn('   Error:', error instanceof Error ? error.message : String(error));
    isConnected = false;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (isConnected) {
    try {
      await mongoose.disconnect();
      isConnected = false;
      console.log('✅ MongoDB disconnected');
    } catch (error) {
      console.error('❌ MongoDB disconnection failed:', error);
    }
  }
};

export const isMongoDBConnected = (): boolean => {
  return isConnected;
};

export default mongoose;

