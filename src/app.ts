import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import donationsRouter from './routes/donations';
import statisticsRouter from './routes/statistics';
import mediaRouter from './routes/media';
import contactRouter from './routes/contact';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// Routes
app.use('/api/donations', donationsRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/media', mediaRouter);
app.use('/api/contact', contactRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
    timestamp: new Date(),
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: _req.path,
    timestamp: new Date(),
  });
});

export default app;
