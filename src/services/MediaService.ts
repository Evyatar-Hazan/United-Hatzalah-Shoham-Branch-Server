import { GalleryItem, Story, ApiResponse } from '../types/index';

interface GalleryItemData {
  title: string;
  category: string;
  imageUrl?: string;
}

interface StoryData {
  title: string;
  description: string;
  date: string;
  image?: string;
}

/* In-memory storage (in production, this would be a database) */
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'קוד אחמר',
    category: 'סדנה',
    imageUrl: 'https://via.placeholder.com/300x200?text=Image+1',
  },
  {
    id: 2,
    title: 'הכשרה בשטח',
    category: 'הכשרה',
    imageUrl: 'https://via.placeholder.com/300x200?text=Image+2',
  },
  {
    id: 3,
    title: 'צוות חדש',
    category: 'מתנדבים',
    imageUrl: 'https://via.placeholder.com/300x200?text=Image+3',
  },
  {
    id: 4,
    title: 'אמבולנס חדש',
    category: 'ציוד',
    imageUrl: 'https://via.placeholder.com/300x200?text=Image+4',
  },
  {
    id: 5,
    title: 'פעילות קהילתית',
    category: 'קהילה',
    imageUrl: 'https://via.placeholder.com/300x200?text=Image+5',
  },
  {
    id: 6,
    title: 'תרגיל הצלה',
    category: 'הכשרה',
    imageUrl: 'https://via.placeholder.com/300x200?text=Image+6',
  },
];

const stories: Story[] = [
  {
    id: 1,
    title: 'הצלה במטבח',
    description:
      'אדם בן 62 נפל בחצר ביתו. המתנדבים שלנו הגיעו תוך 4 דקות, סיפקו עזרה ראשונה והעבירו אותו בטוח לבית החולים.',
    date: '15 בינואר 2024',
  },
  {
    id: 2,
    title: 'נערה צעירה בחנק',
    description:
      'קריאה חירום לדירה בשכונת הדר. מתנדב עם הכשרה בעזרה ראשונה בצע טכניקת פרוק חנק וחציא חיי הנערה.',
    date: '8 בדצמבר 2023',
  },
  {
    id: 3,
    title: 'גבר בהתקף לב',
    description:
      'קריאה בחצות הלילה לגבר בן 55 שסבול התקף לב. המתנדבים השתמשו במכשיר הדיפיברילציה וחזרו את הלב לקצב תקין.',
    date: '22 בנובמבר 2023',
  },
];

export class MediaService {
  static async getGallery(): Promise<ApiResponse<GalleryItem[]>> {
    return {
      success: true,
      data: galleryItems,
      timestamp: new Date(),
    };
  }

  static async getStories(): Promise<ApiResponse<Story[]>> {
    return {
      success: true,
      data: stories,
      timestamp: new Date(),
    };
  }

  static async addGalleryItem(item: GalleryItemData): Promise<ApiResponse<GalleryItem>> {
    const newItem: GalleryItem = {
      id: Math.max(...galleryItems.map((i) => i.id), 0) + 1,
      ...item,
    };
    galleryItems.push(newItem);
    return {
      success: true,
      data: newItem,
      message: 'Gallery item added successfully',
      timestamp: new Date(),
    };
  }

  static async addStory(story: StoryData): Promise<ApiResponse<Story>> {
    const newStory: Story = {
      id: Math.max(...stories.map((s) => s.id), 0) + 1,
      ...story,
    };
    stories.push(newStory);
    return {
      success: true,
      data: newStory,
      message: 'Story added successfully',
      timestamp: new Date(),
    };
  }
}
