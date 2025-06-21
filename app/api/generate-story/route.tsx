import { NextRequest, NextResponse } from 'next/server';
import { chatSession } from '@/config/gemini';
import { db } from '@/config/db';
import { StoryData, Users } from '@/config/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';


async function generateImage(prompt: string): Promise<string> {
  const response = await fetch(
    "https://router.huggingface.co/fal-ai/fal-ai/flux-lora",
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Image generation error:", errorText);
    throw new Error(`HuggingFace API failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  if (!result.images || result.images.length === 0 || !result.images[0].url) {
    throw new Error("No image URL found in response.");
  }

  return result.images[0].url; // return the image URL
}


export async function POST(req: NextRequest) {
  try {
    const {
      formData,
      userEmail,
      userName,
      storyPrompt,
    }: {
      formData: {
        storySubject: string;
        storyType: string;
        imageStyle: string;
        ageGroup: string;
      };
      userEmail: string;
      userName: string;
      storyPrompt: string;
    } = await req.json();

    // 1. Generate AI Story using chatSession
    const chatResult = await chatSession.sendMessage(storyPrompt);
    const storyText = chatResult.response.text();
    const storyJson = JSON.parse(storyText.replace(/(})(,?)(\n *\})/g, '$1,'));

    // 2. Generate Image based on prompt (can customize the prompt for image)
    const imagePrompt = `Create an image in style ${formData.imageStyle} about ${formData.storySubject}`;
    const base64Image = await generateImage(imagePrompt);

    // 3. Save all data in DB
    const recordId = uuidv4();
    const saved = await db.insert(StoryData).values({
      storyId: recordId,
      storySubject: formData.storySubject,
      storyType: formData.storyType,
      ageGroup: formData.ageGroup,
      imageStyle: formData.imageStyle,
      output: storyJson,
      imageBase64: base64Image,
      userEmail,
      userName,
    }).returning({ storyId: StoryData.storyId });

    
    

    return NextResponse.json({ storyId: recordId });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}
