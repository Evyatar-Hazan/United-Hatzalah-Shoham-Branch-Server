/* Type definitions for the backend API */

export interface Donation {
  id: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface BranchStatistics {
  volunteersCount: number;
  emergencyCalls: number;
  averageResponseTime: string;
  uptime: number;
  lastUpdated: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface DonationRequest {
  amount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  timestamp?: Date;
}
