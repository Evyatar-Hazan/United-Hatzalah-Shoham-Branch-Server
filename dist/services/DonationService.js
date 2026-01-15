"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationService = void 0;
/* In-memory storage (in production, this would be a database) */
const donations = [];
class DonationService {
    static async createDonation(donationData) {
        try {
            const donation = {
                id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                amount: donationData.amount,
                donorName: donationData.donorName,
                donorEmail: donationData.donorEmail,
                message: donationData.message,
                timestamp: new Date(),
                status: 'completed',
            };
            donations.push(donation);
            return {
                success: true,
                data: donation,
                message: 'Donation received successfully',
                timestamp: new Date(),
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to process donation',
                timestamp: new Date(),
            };
        }
    }
    static async getDonations() {
        return {
            success: true,
            data: donations,
            timestamp: new Date(),
        };
    }
    static async getDonationStats() {
        const totalDonations = donations.length;
        const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
        return {
            success: true,
            data: {
                totalDonations,
                totalAmount,
            },
            timestamp: new Date(),
        };
    }
}
exports.DonationService = DonationService;
//# sourceMappingURL=DonationService.js.map