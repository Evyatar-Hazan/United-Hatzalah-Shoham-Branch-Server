import { BranchStatistics, ApiResponse } from '../types/index';
export declare class StatisticsService {
    static getStatistics(): Promise<ApiResponse<BranchStatistics>>;
    static updateStatistics(updates: Partial<BranchStatistics>): Promise<ApiResponse<BranchStatistics>>;
}
//# sourceMappingURL=StatisticsService.d.ts.map