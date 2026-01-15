import { BranchStatistics, ApiResponse } from '../types/index';

/* In-memory statistics storage */
const branchStats: BranchStatistics = {
  volunteersCount: 150,
  emergencyCalls: 5000,
  averageResponseTime: '5 minutes',
  uptime: 99.8,
  lastUpdated: new Date(),
};

export class StatisticsService {
  static async getStatistics(): Promise<ApiResponse<BranchStatistics>> {
    return {
      success: true,
      data: branchStats,
      timestamp: new Date(),
    };
  }

  static async updateStatistics(
    updates: Partial<BranchStatistics>
  ): Promise<ApiResponse<BranchStatistics>> {
    try {
      Object.assign(branchStats, updates, { lastUpdated: new Date() });
      return {
        success: true,
        data: branchStats,
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
