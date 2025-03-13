import { z } from 'zod';

export const questionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  answer: z.object({
    type: z.enum(['single', 'multiple', 'all']),
    value: z.union([z.string(), z.array(z.string())]),
    explanation: z.string(),
  }),
});

export type Question = z.infer<typeof questionSchema>;

export const questionsSchema = z.array(questionSchema);
