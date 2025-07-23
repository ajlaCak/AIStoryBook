// app/api/generate-story/route.ts (or route.js)
import { NextRequest, NextResponse } from "next/server";
import { sendMessageWithFallback } from "@/config/gemini";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { v4 as uuidv4 } from "uuid";
import { jsonrepair } from "jsonrepair";


async function generateImage(prompt: string): Promise<string> {
  const response = await fetch("https://router.huggingface.co/fal-ai/fal-ai/flux-lora", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Image generation error:", errorText);
    throw new Error(`HuggingFace API failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  if (!result.images || result.images.length === 0 || !result.images[0].url) {
    throw new Error("No image URL found in response.");
  }

  return result.images[0].url;
}
function normalizeStoryJson(storyJson: any) {
  // Fix top-level keys if needed
  // Example: if "story_title" is used instead of "title"
  if ("story_title" in storyJson) {
    storyJson.title = storyJson.story_title;
    delete storyJson.story_title;
  }
  if ("target_age" in storyJson) {
    storyJson.age_range = storyJson.target_age;
    delete storyJson.target_age;
  }
  if ("book_cover" in storyJson) {
    storyJson.cover_image = storyJson.book_cover;
    delete storyJson.book_cover;
  }
  
  // Normalize chapter fields
  if (Array.isArray(storyJson.chapters)) {
    storyJson.chapters = storyJson.chapters.map((chapter: any) => {
      if ("chapter_title" in chapter) {
        chapter.title = chapter.chapter_title;
        delete chapter.chapter_title;
      }
      if ("story_text" in chapter) {
        chapter.text = chapter.story_text;
        delete chapter.story_text;
      }
      if ("image_description" in chapter === false && "image_desc" in chapter) {
        chapter.image_description = chapter.image_desc;
        delete chapter.image_desc;
      }
      // You can add more fixes here if needed
      
      return chapter;
    });
  }

  return storyJson;
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

    const chatResult = await sendMessageWithFallback(storyPrompt);
    const storyText = chatResult.response.text();
    const storyJson = JSON.parse(jsonrepair(storyText));
const normalizedStoryJson = normalizeStoryJson(storyJson);
    const imagePrompt = `Create an image in style ${formData.imageStyle} about ${formData.storySubject}`;
    const base64Image = await generateImage(imagePrompt);

    const recordId = uuidv4();
    await db.insert(StoryData).values({
      storyId: recordId,
      storySubject: formData.storySubject,
      storyType: formData.storyType,
      ageGroup: formData.ageGroup,
      imageStyle: formData.imageStyle,
      output: normalizedStoryJson,
      imageBase64: base64Image,
      userEmail,
      userName,
    });

    return NextResponse.json({ storyId: recordId });
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json({ error: "Failed to generate story" }, { status: 500 });
  }
}
