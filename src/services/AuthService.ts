import { Admin, ApiResponse } from '../types/index';
import prisma from '../db/prisma';

export class AuthService {
  static async findOrCreateAdmin(email: string, name: string, picture?: string): Promise<ApiResponse<Admin>> {
    try {
      let admin = await prisma.admin.findUnique({
        where: { email },
      });

      if (!admin) {
        admin = await prisma.admin.create({
          data: {
            email,
            name,
            picture: picture || '',
            isActive: true,
          },
        });
      } else {
        admin = await prisma.admin.update({
          where: { id: admin.id },
          data: {
            lastLogin: new Date(),
          },
        });
      }

      return {
        success: true,
        data: admin,
        message: 'Admin authenticated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to authenticate admin',
        timestamp: new Date(),
      };
    }
  }

  static async getAdmins(): Promise<ApiResponse<Admin[]>> {
    try {
      const admins = await prisma.admin.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      });
      return {
        success: true,
        data: admins,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch admins',
        timestamp: new Date(),
      };
    }
  }

  static async getAdminById(id: string): Promise<ApiResponse<Admin>> {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
      });

      if (!admin) {
        return {
          success: false,
          error: 'Admin not found',
          timestamp: new Date(),
        };
      }

      return {
        success: true,
        data: admin,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch admin',
        timestamp: new Date(),
      };
    }
  }

  static async updateAdmin(id: string, updates: Partial<Admin>): Promise<ApiResponse<Admin>> {
    try {
      const admin = await prisma.admin.update({
        where: { id },
        data: updates,
      });

      return {
        success: true,
        data: admin,
        message: 'Admin updated successfully',
        timestamp: new Date(),
      };
    } catch (error: any) {
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'Admin not found',
          timestamp: new Date(),
        };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update admin',
        timestamp: new Date(),
      };
    }
  }

  static async deactivateAdmin(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      await prisma.admin.update({
        where: { id },
        data: { isActive: false },
      });

      return {
        success: true,
        data: { success: true },
        message: 'Admin deactivated successfully',
        timestamp: new Date(),
      };
    } catch (error: any) {
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'Admin not found',
          timestamp: new Date(),
        };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to deactivate admin',
        timestamp: new Date(),
      };
    }
  }
}
