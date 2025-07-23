// config/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "application/json",
};

const baseHistory = [
  {
    role: "user",
    parts: [
      {
        text:
          "Create a children's story based on the following description: for children aged 5–8, an educational story with all illustrations in watercolor style. The story should be about a boy and a school of magic. Provide 5 chapters, each with a detailed prompt for the chapter image and a prompt for the book cover image with the story title. Output everything as a JSON object.",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text:
          "Here's a breakdown of the thought process behind creating the JSON structure for the children's story:\n\n1.  **Understand the Core Request:** The user wants a children's story (ages 5-8) about a boy and a magic school. It needs to be educational, have 5 chapters, include detailed image prompts (watercolor style) for each chapter *and* a cover, and the entire output should be in JSON format. The title should also be generated.\n\n2.  **Determine the JSON Structure:** A logical structure is needed to hold all the requested information.\n    *   A top-level object seems appropriate.\n    *   Inside this object, we need fields for the title, target age, theme (educational), cover information, and the chapters.\n    *   The cover information needs its own prompt.\n    *   The chapters should be an array, as there are multiple.\n    *   Each chapter object within the array needs a title, the story text, and an image prompt.\n\n3.  **Develop the Story Concept (Educational Angle):**\n    *   **Character:** A relatable young boy, maybe a bit shy or uncertain initially, named Luka. This allows for character growth.\n    *   **Setting:** A magical school, but not overly complex. Let's call it \"Škola Čarobnih Iskra\" (School of Magic Sparks) - sounds friendly and implies small, manageable magic.\n    *   **Educational Theme:** What can magic teach kids aged 5-8?\n        *   **Problem-solving:** Using magic to fix simple problems.\n        *   **Patience and Practice:** Magic doesn't always work perfectly the first time.\n        *   **Teamwork/Friendship:** Learning magic with others.\n        *   **Curiosity and Observation:** Noticing details in the magical world.\n        *   **Responsibility:** Using magic wisely.\n    *   **Plot Arc (5 Chapters):**\n        *   **Chapter 1: Invitation:** Luka receives a surprising invitation. Focus on excitement and a bit of nervousness. Introduce the school visually. Educational element: Overcoming initial fear/shyness.\n        *   **Chapter 2: First Lesson (Floating Feather):** A simple, classic magic trick. Focus on the process, the need for focus, and the joy of success (even small success). Educational element: Patience, focus, following instructions.\n        *   **Chapter 3: Mischief and a Lesson (Color Changing):** Introduce a slight conflict or mistake. Luka tries something more complex, maybe makes a mess, and learns about unintended consequences. Introduce a friend (Mila). Educational element: Responsibility, learning from mistakes, friendship.\n        *   **Chapter 4: Helping Others (Growing Flowers):** Luka uses his learned skills for a good purpose. Maybe helping the school gardener or cheering someone up. Educational element: Using skills for good, empathy, teamwork (with Mila).\n        *   **Chapter 5: The Spark Within:** Luka realizes magic isn't just about spells, but about creativity, kindness, and the \"spark\" inside him. A concluding feeling of accomplishment and belonging. Educational element: Self-confidence, inner potential, kindness.\n\n4.  **Draft the Story Text (Chapter by Chapter):**\n    *   Keep sentences relatively short and language simple, appropriate for 5-8 year olds.\n    *   Use descriptive words to engage imagination (shimmering, sparkling, giggling).\n    *   Focus on actions and emotions.\n    *   Incorporate the educational elements subtly within the narrative.\n    *   Ensure a positive and encouraging tone.\n    *   *Self-Correction:* Initially, I might have made the magic too complex. Simplify it to basic concepts like floating, color changing, growing things.\n\n5.  **Create the Image Prompts:**\n    *   **Style:** Consistently specify \"watercolor style,\" \"soft edges,\" \"bright but gentle colors,\" \"children's book illustration.\"\n    *   **Content:** For each prompt, describe the key scene from the chapter. Include the main character (Luka), the setting, the specific magical effect (if any), and the overall mood (wonder, concentration, joy, mischief, kindness).\n    *   **Cover Prompt:** Needs to capture the essence of the story. Luka looking excited/curious, the magical school in the background, maybe some sparks or a hint of magic. Include the title text placement.\n    *   **Detail:** Be specific enough for an AI image generator but allow for artistic interpretation. Mention key objects (letter, feather, chameleon, flowers).\n\n6.  **Assemble the JSON:**\n    *   Create the main JSON object {}.\n    *   Add key-value pairs:\n        *   \"naziv_price\": \"Luka i Škola Čarobnih Iskra\" (Luka and the School of Magic Sparks) - Simple, descriptive.\n        *   \"ciljana_dob\": \"5-8 godina\"\n        *   \"tema\": \"Edukativna priča o učenju, strpljenju, prijateljstvu i korištenju vještina za dobro.\"\n        *   \"naslovnica\": Create an object for the cover with \"opis_slike\" and \"uputa_za_sliku\".\n        *   \"poglavlja\": Create an array [].\n    *   For each chapter:\n        *   Create a chapter object {}.\n        *   Add \"broj_poglavlja\".\n        *   Add \"naslov_poglavlja\".\n        *   Add \"tekst_poglavlja\" (paste the drafted text).\n        *   Add \"opis_slike\" (brief description of the scene).\n        *   Add \"uputa_za_sliku\" (the detailed watercolor prompt).\n        *   Add each chapter object to the poglavlja array.\n\n7.  **Review and Refine:**\n    *   Read through the entire JSON structure.\n    *   Check for consistency in style and tone (both text and image prompts).\n    *   Ensure the language is appropriate for the target age.\n    *   Verify that all parts of the original request have been met.\n    *   Check JSON syntax (commas, brackets, quotes). Ensure it's valid JSON.\n    *   Make sure Croatian terms are used correctly.\n\nThis systematic process ensures all requirements are addressed, the story flows logically, the educational aspect is integrated, and the final output is in the correct format.",
      },
    ],
  },
];

const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const proModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

const startChat = async () => {
  try {
    return await flashModel.startChat({
      generationConfig,
      history: baseHistory,
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      ("status" in err || "message" in err)
    ) {
      const e = err as { status?: number; message?: string };
      if (e.status === 503 || e.message?.includes("overloaded")) {
        console.warn("Flash model overloaded, switching to Pro...");
        return await proModel.startChat({
          generationConfig,
          history: baseHistory,
        });
      }
    }
    throw err;
  }
};

export async function sendMessageWithFallback(prompt: string) {
  let chat;
  try {
    chat = await startChat();
    return await chat.sendMessage(prompt);
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      ("status" in err || "message" in err)
    ) {
      const e = err as { status?: number; message?: string };
      if (e.status === 503 || e.message?.includes("overloaded")) {
        console.warn("Flash model sendMessage overloaded, switching to Pro...");
        const proChat = await proModel.startChat({
          generationConfig,
          history: baseHistory,
        });
        return await proChat.sendMessage(prompt);
      }
    }
    throw err;
  }
}
