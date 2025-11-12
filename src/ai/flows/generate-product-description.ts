'use server';

/**
 * @fileOverview A product description AI generator.
 *
 * - generateProductDescription - A function that generates product descriptions.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  category: z.string().describe('The product category (e.g., shirts, pants, dresses).'),
  garmentType: z.string().describe('The specific type of garment (e.g., t-shirt, jeans, sundress).'),
  theme: z.string().describe('The theme of the clothing brand (e.g., vedic indian maya black and neon green with matrix design).'),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a marketing expert for a clothing brand. The brand theme is '{{{theme}}}'. Generate a product description for a clothing item based on the following information:

Category: {{{category}}}
Garment Type: {{{garmentType}}}

The description should be compelling and sales-oriented.`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
