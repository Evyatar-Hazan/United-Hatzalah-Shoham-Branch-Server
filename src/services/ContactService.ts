import { ContactMessage, ContactInfo, ApiResponse } from '../types/index';
import { ContactInput } from '../utils/validation';

/* In-memory storage for contact messages */
const contactMessages: ContactMessage[] = [];

/* Contact information for the branch */
const contactInfo: ContactInfo = {
  phone: '+972 1-234-567-89',
  email: 'info@shoham.united-hatzalah.org',
  address: 'שוהם, ישראל',
  socialLinks: {
    facebook: 'https://facebook.com/unitedHatzalahShoham',
    instagram: 'https://instagram.com/unitedHatzalahShoham',
    whatsapp: 'https://wa.me/972123456789',
  },
  emergencyNumber: '101',
  businessHours: {
    weekday: '24/7',
    weekend: '24/7',
  },
};

export class ContactService {
  static async submitContactForm(
    formData: ContactInput
  ): Promise<ApiResponse<ContactMessage>> {
    try {
      const message: ContactMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
        status: 'received',
      };

      contactMessages.push(message);

      return {
        success: true,
        data: message,
        message: 'Your message has been received successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit contact form',
        timestamp: new Date(),
      };
    }
  }

  static async getContactInfo(): Promise<ApiResponse<ContactInfo>> {
    return {
      success: true,
      data: contactInfo,
      timestamp: new Date(),
    };
  }

  static async getContactMessages(): Promise<ApiResponse<ContactMessage[]>> {
    return {
      success: true,
      data: contactMessages,
      timestamp: new Date(),
    };
  }
}
