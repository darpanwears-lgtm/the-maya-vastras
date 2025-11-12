'use server';

/**
 * @fileOverview A flow to generate the body of an order confirmation email.
 *
 * - generateOrderEmailBody - A function that generates the email body content.
 * - GenerateOrderEmailBodyInput - The input type for the function.
 * - GenerateOrderEmailBodyOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOrderEmailBodyInputSchema = z.object({
  customerName: z.string().describe("The customer's full name."),
  productName: z.string().describe('The name of the product purchased.'),
  price: z.number().describe('The price of the product.'),
  color: z.string().describe('The selected color of the product.'),
  size: z.string().describe('The selected size of the product.'),
  address: z.string().describe("The customer's full shipping address."),
  email: z.string().describe("The customer's email address."),
  phone: z.string().describe("The customer's phone number."),
});
export type GenerateOrderEmailBodyInput = z.infer<typeof GenerateOrderEmailBodyInputSchema>;

const GenerateOrderEmailBodyOutputSchema = z.object({
  emailBody: z.string().describe('The generated HTML body for the order confirmation email.'),
});
export type GenerateOrderEmailBodyOutput = z.infer<typeof GenerateOrderEmailBodyOutputSchema>;


export async function generateOrderEmailBody(input: GenerateOrderEmailBodyInput): Promise<GenerateOrderEmailBodyOutput> {
    return generateOrderEmailBodyFlow(input);
}


const prompt = ai.definePrompt({
    name: 'generateOrderEmailBodyPrompt',
    input: {schema: GenerateOrderEmailBodyInputSchema},
    output: {schema: GenerateOrderEmailBodyOutputSchema},
    prompt: `You are an order fulfillment specialist. Generate a concise, well-formatted HTML email body for a new order. The email is for internal use.

Order Details:
- Customer: {{{customerName}}}
- Email: {{{email}}}
- Phone: {{{phone}}}
- Product: {{{productName}}}
- Color: {{{color}}}
- Size: {{{size}}}
- Price: ₹{{{price}}}
- Shipping Address: {{{address}}}

Generate an HTML string for the email body. Use headings and lists to make it readable. Do not include a subject line, just the body.`,
});


const generateOrderEmailBodyFlow = ai.defineFlow(
    {
        name: 'generateOrderEmailBodyFlow',
        inputSchema: GenerateOrderEmailBodyInputSchema,
        outputSchema: GenerateOrderEmailBodyOutputSchema,
    },
    async (input) => {
        const {output} = await prompt(input);
        return output!;
    }
);
