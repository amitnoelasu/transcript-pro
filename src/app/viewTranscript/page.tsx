"use client"
import { useParams, useRouter } from "next/navigation";
import Comments from "../components/comments/Comments";
import { useSearchParams } from 'next/navigation'

export default function Page() {
    const params = useSearchParams()

   const transcriptId = params.get('transcriptId');
    return(
        <Comments transcriptId={transcriptId as string} />
    )
}