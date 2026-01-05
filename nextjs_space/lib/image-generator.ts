import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEducationalImage(
  concept: string,
  subject: string,
  style: 'diagram' | 'illustration' | 'realistic' | 'abstract' = 'illustration'
): Promise<string | null> {
  try {
    const stylePrompts = {
      diagram: 'Clean educational diagram with labels, simple and clear',
      illustration: 'Colorful, engaging illustration perfect for students',
      realistic: 'Photorealistic educational image',
      abstract: 'Abstract visual representation with vibrant colors',
    };

    const prompt = `Educational ${style} about "${concept}" for ${subject}. ${stylePrompts[style]}. High quality, visually appealing, suitable for learning. No text or labels.`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    return response?.data?.[0]?.url || null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

export async function generateFlashcardImage(
  concept: string,
  subject: string
): Promise<string | null> {
  return generateEducationalImage(concept, subject, 'illustration');
}

export async function generateConceptDiagram(
  concept: string,
  subject: string
): Promise<string | null> {
  return generateEducationalImage(concept, subject, 'diagram');
}
