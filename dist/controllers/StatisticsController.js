"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const StatisticsService_1 = require("../services/StatisticsService");
class StatisticsController {
    static async getStatistics(_req, res) {
        try {
            const result = await StatisticsService_1.StatisticsService.getStatistics();
            res.json(result);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
                timestamp: new Date(),
            });
        }
    }
    static async updateStatistics(req, res) {
        try {
            const result = await StatisticsService_1.StatisticsService.updateStatistics(req.body);
            res.json(result);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
                timestamp: new Date(),
            });
        }
    }
}
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=StatisticsController.js.map