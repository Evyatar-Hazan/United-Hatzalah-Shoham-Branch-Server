"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
/* In-memory statistics storage */
const branchStats = {
    volunteersCount: 150,
    emergencyCalls: 5000,
    averageResponseTime: '5 minutes',
    uptime: 99.8,
    lastUpdated: new Date(),
};
class StatisticsService {
    static async getStatistics() {
        return {
            success: true,
            data: branchStats,
            timestamp: new Date(),
        };
    }
    static async updateStatistics(updates) {
        try {
            Object.assign(branchStats, updates, { lastUpdated: new Date() });
            return {
                success: true,
                data: branchStats,
                message: 'Statistics updated successfully',
                timestamp: new Date(),
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to update statistics',
                timestamp: new Date(),
            };
        }
    }
}
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=StatisticsService.js.map