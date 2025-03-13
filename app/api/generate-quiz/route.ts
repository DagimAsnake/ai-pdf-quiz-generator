import { questionSchema, questionsSchema } from '@/lib/schemas';
import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const result = streamObject({
    model: google('gemini-1.5-pro-latest'),
    messages: [
      {
        role: 'system',
        content:
          'You are a teacher. Create a multiple choice test (with 4 questions) based on the document content. For each question, provide:\n' +
          '1. A clear question\n' +
          '2. Four options of roughly equal length\n' +
          '3. The correct answer(s) with type (single/multiple/all)\n' +
          '4. A brief explanation of why the answer is correct\n' +
          "Format answers to handle cases where multiple options are correct or when 'all of the above' applies.",
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Create a multiple choice test based on this document.',
          },
          {
            type: 'file',
            data: firstFile,
            mimeType: 'application/pdf',
          },
        ],
      },
    ],
    schema: questionSchema,
    output: 'array',
    onFinish: ({ object }) => {
      const res = questionsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join('\n'));
      }
    },
  });

  return result.toTextStreamResponse();
}
