"use client"
import React, { useState, useEffect, useRef } from 'react';

interface FeedbackComponentProps {
  messages: {
    role: string;
    content: string;
  }[];
  triggerSummarize: boolean; // New prop to trigger summarization
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ messages, triggerSummarize }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const feedbackEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const summarizeFeedback = async () => {
      if (messages.length === 0) {
        console.warn("No messages to summarize.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch('/api/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let updatedFeedback = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            updatedFeedback += decoder.decode(value, { stream: true });
            setFeedback(updatedFeedback);
          }
        }

      } catch (error) {
        console.error('Error summarizing feedback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (triggerSummarize) {
      summarizeFeedback();
    }
  }, [messages, triggerSummarize]);

  useEffect(() => {
    if (feedbackEndRef.current) {
      feedbackEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [feedback]);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md  ">
      {/* Heading for Feedback Summary */}
      <h2 className="text-xl font-bold mb-4">Feedback Summary</h2>

      {/* Feedback Content */}
      <div>
        {feedback.split('\n').map((line, i) => (
          <p key={i} className="mb-2">
            {line}
          </p>
        ))}
      </div>

      <div ref={feedbackEndRef} />
      {isLoading && <p className="text-gray-400">Loading...</p>}
    </div>
  );
};

export default FeedbackComponent;
