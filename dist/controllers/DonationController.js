"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationController = void 0;
const DonationService_1 = require("../services/DonationService");
const validation_1 = require("../utils/validation");
class DonationController {
    static async createDonation(req, res) {
        try {
            const validation = (0, validation_1.validateData)(validation_1.DonationSchema, req.body);
            if (!validation.valid) {
                res.status(400).json({
                    success: false,
                    error: validation.error,
                    timestamp: new Date(),
                });
                return;
            }
            const result = await DonationService_1.DonationService.createDonation(validation.data);
            if (!result.success) {
                res.status(400).json(result);
                return;
            }
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
                timestamp: new Date(),
            });
        }
    }
    static async getDonations(_req, res) {
        try {
            const result = await DonationService_1.DonationService.getDonations();
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
    static async getDonationStats(_req, res) {
        try {
            const result = await DonationService_1.DonationService.getDonationStats();
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
exports.DonationController = DonationController;
//# sourceMappingURL=DonationController.js.map