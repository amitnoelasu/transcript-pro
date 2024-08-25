"use client";
import { NextUIProvider } from "@nextui-org/react";
import Comments from "./components/comments/Comments";

// import { Grid } from '@nextui-org/react';

export default function Home() {
  
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background min-h-screen">
        <Comments transcriptId="1"></Comments>
      </main>
    </NextUIProvider>
  );
}