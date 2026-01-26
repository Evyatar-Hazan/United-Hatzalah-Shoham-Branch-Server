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

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl?: string;
}

export interface Story {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  status: 'received' | 'read' | 'replied';
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  emergencyNumber: string;
  businessHours: {
    weekday: string;
    weekend: string;
  };
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  picture?: string;
  addedAt: Date;
  addedBy?: string;
}

