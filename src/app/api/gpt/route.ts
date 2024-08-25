import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});    

const systemPrompt = `
You are an expert in analyzing sales conversations and providing actionable feedback to enhance sales techniques. Given a set of messages from a conversation between a salesperson and a customer, along with feedback points provided at specific moments, your task is to summarize the overall feedback. This summary should focus on identifying strengths and areas for improvement in the salesperson's approach.

Instructions:

Review the Conversation: Analyze the full conversation between the salesperson and the customer. Pay attention to the salesperson's responses, tone, and handling of customer inquiries.

Evaluate Feedback Points: Consider the feedback provided at specific points in the conversation. Determine how this feedback reflects the salesperson's performance and interaction with the customer.

Summarize Feedback:

Strengths: Identify what the salesperson did well. Highlight aspects such as effective communication, empathy, and responsiveness.
Areas for Improvement: Point out any weaknesses or areas where the salesperson could enhance their skills. This might include handling objections, clarifying information, or improving engagement.
Actionable Recommendations: Provide specific suggestions on how the salesperson can improve their approach in future interactions. This may include techniques for better rapport building, more effective questioning, or improved product knowledge.
Output Format:

Strengths:

[List the strengths identified]
Areas for Improvement:

[List the areas for improvement with explanations]
Actionable Recommendations:

[Provide practical advice and tips for improvement]

Give a neatly formatted response.
`;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...data.messages,
      ],
      temperature: 0.5,
      stream: true,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of chatCompletion) {
          const text = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(text);
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Error creating completion:', error);
    return NextResponse.json({ message: 'Error creating completion', error: error }, { status: 500 });
  }
}