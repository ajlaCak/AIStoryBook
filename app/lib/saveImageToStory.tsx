import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';

export async function saveImageToStory(storyId: string, base64Image: string) {
  await db
    .update(StoryData)
    .set({ imageBase64: base64Image })
    .where(eq(StoryData.storyId, storyId));
}
