import { v2 as cloudinary } from 'cloudinary';
import { ApiResponse } from '../types/index';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  /**
   * Upload image to Cloudinary and return the URL
   * @param fileBuffer - File buffer from request
   * @param folder - Folder path in Cloudinary (e.g., 'gallery', 'stories')
   * @returns URL of uploaded image
   */
  static async uploadImage(
    fileBuffer: Buffer,
    folder: string = 'united-hatzalah'
  ): Promise<ApiResponse<{ url: string; publicId: string }>> {
    try {
      return new Promise((resolve) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `united-hatzalah/${folder}`,
            resource_type: 'auto',
            quality: 'auto',
            width: 1200,
            height: 1200,
            crop: 'fill',
          },
          (error, result) => {
            if (error) {
              resolve({
                success: false,
                error: `Upload failed: ${error.message}`,
                timestamp: new Date(),
              });
              return;
            }

            if (!result) {
              resolve({
                success: false,
                error: 'Upload failed: No result returned',
                timestamp: new Date(),
              });
              return;
            }

            resolve({
              success: true,
              data: {
                url: result.secure_url,
                publicId: result.public_id,
              },
              timestamp: new Date(),
            });
          }
        );

        uploadStream.end(fileBuffer);
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Delete image from Cloudinary
   */
  static async deleteImage(publicId: string): Promise<ApiResponse<null>> {
    try {
      await cloudinary.uploader.destroy(publicId);
      return {
        success: true,
        data: null,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
        timestamp: new Date(),
      };
    }
  }
}
