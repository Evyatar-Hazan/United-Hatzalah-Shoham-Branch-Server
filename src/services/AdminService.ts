import { GalleryItem, Story, BranchStatistics, ContactInfo, ContactMessage, ApiResponse } from '../types/index';
import { MediaService } from './MediaService';
import { StatisticsService } from './StatisticsService';
import { ContactService } from './ContactService';

export class AdminService {
  // Gallery operations
  static async getGallery(): Promise<ApiResponse<GalleryItem[]>> {
    return MediaService.getGallery();
  }

  static async addGalleryItem(item: any): Promise<ApiResponse<GalleryItem>> {
    return MediaService.addGalleryItem(item);
  }

  static async updateGalleryItem(id: number, updates: Partial<GalleryItem>): Promise<ApiResponse<GalleryItem>> {
    try {
      const galleryResult = await MediaService.getGallery();
      const galleries = galleryResult.data || [];
      const index = galleries.findIndex(g => g.id === id);

      if (index === -1) {
        return {
          success: false,
          error: 'Gallery item not found',
          timestamp: new Date(),
        };
      }

      galleries[index] = { ...galleries[index], ...updates };

      return {
        success: true,
        data: galleries[index],
        message: 'Gallery item updated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update gallery item',
        timestamp: new Date(),
      };
    }
  }

  static async deleteGalleryItem(id: number): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const galleryResult = await MediaService.getGallery();
      const galleries = galleryResult.data || [];
      const filtered = galleries.filter(g => g.id !== id);

      if (filtered.length === galleries.length) {
        return {
          success: false,
          error: 'Gallery item not found',
          timestamp: new Date(),
        };
      }

      return {
        success: true,
        data: { success: true },
        message: 'Gallery item deleted successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete gallery item',
        timestamp: new Date(),
      };
    }
  }

  // Stories operations
  static async getStories(): Promise<ApiResponse<Story[]>> {
    return MediaService.getStories();
  }

  static async addStory(story: any): Promise<ApiResponse<Story>> {
    return MediaService.addStory(story);
  }

  static async updateStory(id: number, updates: Partial<Story>): Promise<ApiResponse<Story>> {
    try {
      const storiesResult = await MediaService.getStories();
      const stories = storiesResult.data || [];
      const index = stories.findIndex(s => s.id === id);

      if (index === -1) {
        return {
          success: false,
          error: 'Story not found',
          timestamp: new Date(),
        };
      }

      stories[index] = { ...stories[index], ...updates };

      return {
        success: true,
        data: stories[index],
        message: 'Story updated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update story',
        timestamp: new Date(),
      };
    }
  }

  static async deleteStory(id: number): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const storiesResult = await MediaService.getStories();
      const stories = storiesResult.data || [];
      const filtered = stories.filter(s => s.id !== id);

      if (filtered.length === stories.length) {
        return {
          success: false,
          error: 'Story not found',
          timestamp: new Date(),
        };
      }

      return {
        success: true,
        data: { success: true },
        message: 'Story deleted successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete story',
        timestamp: new Date(),
      };
    }
  }

  // Statistics operations
  static async getStatistics(): Promise<ApiResponse<BranchStatistics>> {
    return StatisticsService.getStatistics();
  }

  static async updateStatistics(updates: Partial<BranchStatistics>): Promise<ApiResponse<BranchStatistics>> {
    return StatisticsService.updateStatistics(updates);
  }

  // Contact Info operations
  static async getContactInfo(): Promise<ApiResponse<ContactInfo>> {
    return ContactService.getContactInfo();
  }

  static async updateContactInfo(updates: Partial<ContactInfo>): Promise<ApiResponse<any>> {
    try {
      const contactResult = await ContactService.getContactInfo();
      const currentInfo = (contactResult.data || {}) as Partial<ContactInfo>;
      const contactInfo = {
        phone: updates.phone || currentInfo.phone || '',
        email: updates.email || currentInfo.email || '',
        address: updates.address || currentInfo.address,
        socialLinks: updates.socialLinks || currentInfo.socialLinks,
        emergencyNumber: updates.emergencyNumber || currentInfo.emergencyNumber,
        businessHours: updates.businessHours || currentInfo.businessHours,
      };

      return {
        success: true,
        data: contactInfo,
        message: 'Contact info updated successfully',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update contact info',
        timestamp: new Date(),
      };
    }
  }

  // Contact Messages
  static async getContactMessages(): Promise<ApiResponse<ContactMessage[]>> {
    return ContactService.getContactMessages();
  }
}
