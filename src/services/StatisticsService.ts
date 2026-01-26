import { Statistics, ApiResponse } from '../types/index';
import prisma from '../db/prisma';

export class StatisticsService {
  static async getStatistics(): Promise<ApiResponse<Statistics | null>> {
    try {
      const stats = await prisma.statistics.findFirst({
        orderBy: { lastUpdated: 'desc' },
      });

      // Return null if no statistics exist - don't create dummy data
      return {
        success: true,
        data: stats || null,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch statistics',
        timestamp: new Date(),
      };
    }
  }

  static async updateStatistics(updates: Partial<Statistics>): Promise<ApiResponse<Statistics>> {
    try {
      const currentStats = await prisma.statistics.findFirst({
        orderBy: { lastUpdated: 'desc' },
      });

      let updatedStats: Statistics;
      if (currentStats) {
        updatedStats = await prisma.statistics.update({
          where: { id: currentStats.id },
          data: {
            ...updates,
            lastUpdated: new Date(),
          },
        });
      } else {
        updatedStats = await prisma.statistics.create({
          data: {
            volunteersCount: updates.volunteersCount || 150,
            emergencyCalls: updates.emergencyCalls || 2500,
            averageResponseTime: updates.averageResponseTime || 3,
            uptime: updates.uptime || 99.9,
            lastUpdated: new Date(),
          },
        });
      }

      return {
        success: true,
        data: updatedStats,
        message: 'Statistics updated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update statistics',
        timestamp: new Date(),
      };
    }
  }
}
