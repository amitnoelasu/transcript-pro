"use client";
import { Button, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Comments from "./components/comments/Comments";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
// import { Grid } from '@nextui-org/react';

// Load Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });
export default function Home() {
  const [transcripts, setTranscripts] = useState<{ TranscriptId: string }[]>(
    []
  );

  const router = useRouter()

  async function fetchTranscripts() {
    try {
      const response = await fetch("/api/transcripts"); 
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch transcripts:", error);
      return [];
    }
  }

  useEffect(() => {
    async function loadTranscripts() {
      const fetchedTranscripts = await fetchTranscripts();
      setTranscripts(fetchedTranscripts);
    }

    loadTranscripts();
  }, []);

  const handleTranscriptClick = (transcriptId: string) => {
    // Handle click event, e.g., navigate to details page or display transcript
    
    console.log("Transcript clicked:", transcriptId);
    router.push(`/viewTranscript?transcriptId=${transcriptId}`);
  };
  

  const [isTextVisible, setIsTextVisible] = useState(false);

  // Trigger when text animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 1000); // Adjust delay to match text animation duration

    return () => clearTimeout(timer);
  }, []);


  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8 ${inter.className}`}>
          {/* Heading and Caption */}
          <div className="text-center mb-12">
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ marginTop: 0 }} // Ensure no top margin is altered
            >
              Welcome to Transcript Pro
            </motion.h1>
            <motion.p
              className="text-xl max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ marginTop: 0 }} // Ensure no top margin is altered
            >
              Your AI-first text annotation service. Add comments and provide feedback to your conversations and level up your sales crew.
            </motion.p>
          </div>

          {/* Conditionally Render Transcripts */}
          {isTextVisible && (
            <motion.div
              className="flex flex-wrap gap-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ marginTop: '2rem' }} // Add margin to ensure proper spacing
            >
              {transcripts.map((transcript) => (
                <motion.button
                  key={transcript.TranscriptId}
                  onClick={() => handleTranscriptClick(transcript.TranscriptId)}
                  className="text-lg p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-600 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Transcript {transcript.TranscriptId}
                  <ArrowRightIcon className="w-6 h-6 ml-2 text-white" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
