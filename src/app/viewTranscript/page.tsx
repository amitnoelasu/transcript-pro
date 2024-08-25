"use client"
import Comments from "../components/comments/Comments";
import { useSearchParams } from 'next/navigation'
import { Suspense } from "react";

export default function Page() {
    const params = useSearchParams()

   const transcriptId = params.get('transcriptId');
    return(

        <Suspense>
        <Comments transcriptId={transcriptId as string} />
      </Suspense>
        
    )
}