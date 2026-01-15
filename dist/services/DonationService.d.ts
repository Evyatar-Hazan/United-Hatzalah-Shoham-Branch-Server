import { Donation, DonationRequest, ApiResponse } from '../types/index';
export declare class DonationService {
    static createDonation(donationData: DonationRequest): Promise<ApiResponse<Donation>>;
    static getDonations(): Promise<ApiResponse<Donation[]>>;
    static getDonationStats(): Promise<ApiResponse<{
        totalDonations: number;
        totalAmount: number;
    }>>;
}
//# sourceMappingURL=DonationService.d.ts.map