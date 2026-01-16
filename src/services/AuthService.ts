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
];

export class AuthService {
  static async verifyGoogleToken(token: string): Promise<ApiResponse<any>> {
    try {
      // Note: בייצור, יש לאמת את ה-token עם Google API
      // כאן נעשה פענוח פשוט למטרות development
      
      const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      
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
