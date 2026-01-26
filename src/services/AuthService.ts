import { ApiResponse, Admin } from '../types/index';

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

// Admin users storage (in-memory, would be database in production)
let admins: Admin[] = [
  {
    id: '1',
    email: 'admin@united-hatzalah.org',
    name: 'Admin User',
    addedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'shoham@united-hatzalah.org',
    name: 'Shoham Admin',
    addedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    email: 'EvyatarHazan3.14@gmail.com',
    name: 'Evyatar Hazan',
    addedAt: new Date('2024-01-01'),
  },
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

      const isAdmin = admins.some(admin => admin.email === decodedToken.email);

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
    const isAdmin = admins.some(admin => admin.email === email);
    
    return {
      success: true,
      data: { isAdmin },
      timestamp: new Date(),
    };
  }

  // Admin Management Operations
  static async getAdmins(): Promise<ApiResponse<Admin[]>> {
    return {
      success: true,
      data: admins,
      timestamp: new Date(),
    };
  }

  static async addAdmin(adminData: { email: string; name: string; picture?: string; addedBy?: string }): Promise<ApiResponse<Admin>> {
    try {
      // Check if admin already exists
      if (admins.some(admin => admin.email === adminData.email)) {
        return {
          success: false,
          error: 'Admin with this email already exists',
          timestamp: new Date(),
        };
      }

      const newAdmin: Admin = {
        id: Date.now().toString(),
        email: adminData.email,
        name: adminData.name,
        picture: adminData.picture,
        addedAt: new Date(),
        addedBy: adminData.addedBy,
      };

      admins.push(newAdmin);

      return {
        success: true,
        data: newAdmin,
        message: 'Admin added successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add admin',
        timestamp: new Date(),
      };
    }
  }

  static async updateAdmin(id: string, updates: Partial<Admin>): Promise<ApiResponse<Admin>> {
    try {
      const adminIndex = admins.findIndex(admin => admin.id === id);

      if (adminIndex === -1) {
        return {
          success: false,
          error: 'Admin not found',
          timestamp: new Date(),
        };
      }

      // Check if email is being changed and if it conflicts with existing admin
      if (updates.email && updates.email !== admins[adminIndex].email) {
        if (admins.some(admin => admin.email === updates.email)) {
          return {
            success: false,
            error: 'Email already in use by another admin',
            timestamp: new Date(),
          };
        }
      }

      // Update admin (preserve id and addedAt)
      admins[adminIndex] = {
        ...admins[adminIndex],
        ...updates,
        id: admins[adminIndex].id,
        addedAt: admins[adminIndex].addedAt,
      };

      return {
        success: true,
        data: admins[adminIndex],
        message: 'Admin updated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update admin',
        timestamp: new Date(),
      };
    }
  }

  static async deleteAdmin(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const adminIndex = admins.findIndex(admin => admin.id === id);

      if (adminIndex === -1) {
        return {
          success: false,
          error: 'Admin not found',
          timestamp: new Date(),
        };
      }

      // Prevent deleting the last admin
      if (admins.length === 1) {
        return {
          success: false,
          error: 'Cannot delete the last admin',
          timestamp: new Date(),
        };
      }

      admins.splice(adminIndex, 1);

      return {
        success: true,
        data: { success: true },
        message: 'Admin deleted successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete admin',
        timestamp: new Date(),
      };
    }
  }
}
