import { Donation, DonationRequest, ApiResponse } from '../types/index';

/* In-memory storage (in production, this would be a database) */
const donations: Donation[] = [];

export class DonationService {
  static async createDonation(donationData: DonationRequest): Promise<ApiResponse<Donation>> {
    try {
      const donation: Donation = {
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
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process donation',
        timestamp: new Date(),
      };
    }
  }

  static async getDonations(): Promise<ApiResponse<Donation[]>> {
    return {
      success: true,
      data: donations,
      timestamp: new Date(),
    };
  }

  static async getDonationStats(): Promise<
    ApiResponse<{ totalDonations: number; totalAmount: number }>
  > {
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

  static async updateDonation(id: string, updates: Partial<Donation>): Promise<ApiResponse<Donation>> {
    try {
      const index = donations.findIndex(d => d.id === id);
      if (index === -1) {
        return {
          success: false,
          error: 'Donation not found',
          timestamp: new Date(),
        };
      }

      donations[index] = { ...donations[index], ...updates, id: donations[index].id };

      return {
        success: true,
        data: donations[index],
        message: 'Donation updated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update donation',
        timestamp: new Date(),
      };
    }
  }

  static async deleteDonation(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const index = donations.findIndex(d => d.id === id);
      if (index === -1) {
        return {
          success: false,
          error: 'Donation not found',
          timestamp: new Date(),
        };
      }

      donations.splice(index, 1);

      return {
        success: true,
        data: { success: true },
        message: 'Donation deleted successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete donation',
        timestamp: new Date(),
      };
    }
  }
}
