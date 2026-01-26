import { Donor, ApiResponse } from '../types/index';

/* In-memory storage (in production, this would be a database) */
let donors: Donor[] = [
  { id: '1', name: 'תורם אחד', category: 'תורם ראשי', logo: undefined },
  { id: '2', name: 'תורם שני', category: 'תורם', logo: undefined },
  { id: '3', name: 'תורם שלישי', category: 'תורם', logo: undefined },
  { id: '4', name: 'תורם רביעי', category: 'תורם', logo: undefined },
  { id: '5', name: 'תורם חמישי', category: 'תורם', logo: undefined },
  { id: '6', name: 'תורם שישי', category: 'שותף', logo: undefined },
];

export class DonorsService {
  static async getDonors(): Promise<ApiResponse<Donor[]>> {
    try {
      return {
        success: true,
        data: donors,
        message: 'Donors fetched successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch donors',
        timestamp: new Date(),
      };
    }
  }

  static async addDonor(name: string, category: string, logo?: string): Promise<ApiResponse<Donor>> {
    try {
      if (!name || !category) {
        return {
          success: false,
          error: 'Name and category are required',
          timestamp: new Date(),
        };
      }

      const newDonor: Donor = {
        id: `donor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        category,
        logo,
      };

      donors.push(newDonor);

      return {
        success: true,
        data: newDonor,
        message: 'Donor added successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add donor',
        timestamp: new Date(),
      };
    }
  }

  static async updateDonor(id: string, updates: Partial<Donor>): Promise<ApiResponse<Donor>> {
    try {
      const index = donors.findIndex((d) => d.id === id);

      if (index === -1) {
        return {
          success: false,
          error: 'Donor not found',
          timestamp: new Date(),
        };
      }

      const updated: Donor = {
        ...donors[index],
        ...updates,
        id: donors[index].id, // Preserve ID
      };

      donors[index] = updated;

      return {
        success: true,
        data: updated,
        message: 'Donor updated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update donor',
        timestamp: new Date(),
      };
    }
  }

  static async deleteDonor(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const index = donors.findIndex((d) => d.id === id);

      if (index === -1) {
        return {
          success: false,
          error: 'Donor not found',
          timestamp: new Date(),
        };
      }

      donors.splice(index, 1);

      return {
        success: true,
        data: { success: true },
        message: 'Donor deleted successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete donor',
        timestamp: new Date(),
      };
    }
  }
}
