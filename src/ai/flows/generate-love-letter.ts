'use server';

/**
 * @fileOverview Generates a personalized love letter using AI.
 *
 * - generateLoveLetter - A function that generates a personalized love letter.
 * - GenerateLoveLetterInput - The input type for the generateLoveLetter function.
 * - GenerateLoveLetterOutput - The return type for the generateLoveLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveLetterInputSchema = z.object({
  recipientName: z.string().describe('The name of the recipient of the love letter.'),
  senderName: z.string().describe('The name of the sender of the love letter.'),
  relationshipDetails: z
    .string()
    .describe(
      'Details about the relationship, including important memories, shared experiences, and qualities you love about them.'
    ),
  tone: z.enum(['romantic', 'playful', 'serious', 'affectionate']).describe('The tone of the love letter.'),
});

export type GenerateLoveLetterInput = z.infer<typeof GenerateLoveLetterInputSchema>;

const GenerateLoveLetterOutputSchema = z.object({
  loveLetter: z.string().describe('The generated love letter.'),
});

export type GenerateLoveLetterOutput = z.infer<typeof GenerateLoveLetterOutputSchema>;

export async function generateLoveLetter(input: GenerateLoveLetterInput): Promise<GenerateLoveLetterOutput> {
  return generateLoveLetterFlow(input);
}

const generateLoveLetterPrompt = ai.definePrompt({
  name: 'generateLoveLetterPrompt',
  input: {schema: GenerateLoveLetterInputSchema},
  output: {schema: GenerateLoveLetterOutputSchema},
  prompt: `You are an AI assistant designed to write personalized love letters.

Write a love letter to {{{recipientName}}} from {{{senderName}}}. Use a {{{tone}}} tone.

Relationship Details: {{{relationshipDetails}}}

Love Letter:
`,
});

const generateLoveLetterFlow = ai.defineFlow(
  {
    name: 'generateLoveLetterFlow',
    inputSchema: GenerateLoveLetterInputSchema,
    outputSchema: GenerateLoveLetterOutputSchema,
  },
  async input => {
    const {output} = await generateLoveLetterPrompt(input);
    return output!;
  }
);
