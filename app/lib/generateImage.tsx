// lib/generateImage.ts
import axios from 'axios';

export async function generateImageFromPrompt(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
  if (!apiKey) throw new Error('Hugging Face API key is not set.');

  const response = await axios.post(
    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      responseType: 'arraybuffer',
    }
  );

  const imageBuffer = Buffer.from(response.data, 'binary');
  return imageBuffer.toString('base64');
}
