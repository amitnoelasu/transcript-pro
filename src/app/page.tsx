"use client";
import { Button, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Comments from "./components/comments/Comments";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
// import { Grid } from '@nextui-org/react';

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

  return (
    <NextUIProvider>
      {/* <main className="dark text-foreground bg-background min-h-screen">
        
      </main> */}
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <div className="flex flex-wrap gap-4 p-4">
          {transcripts.map((transcript) => (
            <Button
              key={transcript.TranscriptId}
              onClick={() => handleTranscriptClick(transcript.TranscriptId)}
              className="text-lg p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
              // icon={}
            >
              Transcript {transcript.TranscriptId} <ArrowRightIcon className="w-6 h-6 text-white" />
            </Button>
          ))}
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
