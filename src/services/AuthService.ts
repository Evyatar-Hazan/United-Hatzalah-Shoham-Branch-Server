import { ApiResponse } from '../types/index';

// interface GoogleTokenPayload {
//   iss: string;
//   azp: string;
//   aud: string;
//   sub: string;
//   email: string;
//   email_verified: boolean;
//   name: string;
//   picture: string;
//   given_name: string;
//   iat: number;
//   exp: number;
// }

// Admin emails list (מפתח זה צריך להיות מעדכן בעתיד עם database)
const ADMIN_EMAILS = [
  'admin@united-hatzalah.org',
  'shoham@united-hatzalah.org',
  'EvyatarHazan3.14@gmail.com',
];

export class AuthService {
  static async verifyGoogleToken(token: string): Promise<ApiResponse<any>> {
    try {
      // Handle mock tokens in development (format: header.payload.signature)
      const parts = token.split('.');
      if (parts.length !== 3) {
        return {
          success: false,
          error: 'Invalid token format',
          timestamp: new Date(),
        };
      }

      // Decode payload (middle part)
      let decodedToken;
      try {
        const payload = parts[1];
        // Add padding if needed
        const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
        decodedToken = JSON.parse(Buffer.from(padded, 'base64').toString());
      } catch (e) {
        return {
          success: false,
          error: 'Failed to decode token payload',
          timestamp: new Date(),
        };
      }
      
      if (!decodedToken.email_verified) {
        return {
          success: false,
          error: 'Email not verified',
          timestamp: new Date(),
        };
      }

      const isAdmin = ADMIN_EMAILS.includes(decodedToken.email);

      return {
        success: true,
        data: {
          email: decodedToken.email,
          name: decodedToken.name,
          picture: decodedToken.picture,
          isAdmin,
        },
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Token verification failed',
        timestamp: new Date(),
      };
    }
  }

  static async checkIfAdmin(email: string): Promise<ApiResponse<{ isAdmin: boolean }>> {
    const isAdmin = ADMIN_EMAILS.includes(email);
    
    return {
      success: true,
      data: { isAdmin },
      timestamp: new Date(),
    };
  }
}
