import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { AppProps } from "next/app";
import { Textarea } from "@nextui-org/react";
import { Transcript, TranscriptEntry, BackendComments } from "../../types";
import transcriptData from "../../transcripts.json";
// import AddComment from "../components/AddComment";



export const Comments = ({ transcriptId }: { transcriptId: string }) => {
  
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [transcriptEntries, setTranscriptEntries] = useState<JSX.Element[]>([]);
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [currentWordText, setCurrentWordText] = useState<string>("");
  const [currentWordId, setCurrentWordId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function formatId(entryIndex: number, wordIndex: number): string {
    const paddedEntryIndex = entryIndex.toString().padStart(4, "0");
    const paddedWordIndex = wordIndex.toString().padStart(4, "0");
    return `${paddedEntryIndex}#${paddedWordIndex}`;
  }

  function loadTranscript() {
    const data: Transcript = transcriptData;
    const transcript = data.transcript;

    const entries = transcript.map((entry, entryIndex) => {
      const words = entry.text.split(" ").map((word, wordIndex) => (
        <span
          key={formatId(entryIndex, wordIndex)}
          id={formatId(entryIndex, wordIndex)}
          className="inline-block mx-1 hover:bg-sky-700"
          onClick={handleWordClick}
        >
          {word}
        </span>
      ));

      return (
        <div key={entryIndex} className="mb-2">
          <span className="font-bold">{`[${entry.time}] ${entry.speaker}: `}</span>
          {words}
        </div>
      );
    });

    setTranscriptEntries(entries);
  }

  useEffect(() => {
    loadTranscript();
  }, []);

  function handleWordClick(e: React.MouseEvent<HTMLSpanElement>) {
    console.log("Clicked word:", e.currentTarget.textContent);
    const clickedWord = e.currentTarget.textContent || "";
    const spanId = e.currentTarget.id;

    setCurrentWordText(clickedWord);
    setCurrentWordId(spanId);
    setShowTextarea(true);
  }

  const [backendComments, setBackendComments] = useState<BackendComments>([]);
  const [activeComment, setActiveComment] = useState(null);

  const addComment = async (
    text: string,
    spanId: string,
    transcriptId: string,
    spanText: string
  ) => {
    // console.log("params222", text, spanId, transcriptId, spanText);
    try {
      const response = await fetch("/api/comments/addComment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          TranscriptId: transcriptId,
          commentText: text,
          SpanId: spanId,
          spanText: spanText,
        }),
      });
      if (response.ok) {
        // Re-fetch comments after successfully adding a new one
        setShowTextarea(false);
        await getCommentsFromDb();
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const getCommentsFromDb = async () => {
    try {
      const response = await fetch("/api/comments/getComments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          transcriptId: transcriptId,
        }),
      });

      const comments = await response.json();
      console.log(comments);
      setBackendComments(comments);
    } catch (error) {
      console.error("Unexpected response format:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const updateComment = async (updatedComment: string, commentId: string) => {
    const response = await fetch("/api/comments", {
      method: "UPDATE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        updatedComment: updatedComment,
        commendId: commentId,
      }),
    });
  };

  const deleteComment = async (commentId: string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      const response = await fetch("/api/comments", {
        method: "UPDATE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ commendId: commentId }),
      });
    }
  };

  useEffect(() => {
    getCommentsFromDb();
  }, []);

  const [highlightSpanId, setHighlightSpanId] = useState<string | null>(null);
  const handleWordHover = (spanId: string) => {
    const element = document.getElementById(spanId);
    if (element) {
      element.classList.add('bg-green-300');
    }
  };

  const handleWordLeave = (spanId: string) => {
    const element = document.getElementById(spanId);
    if (element) {
      element.classList.remove('bg-green-300');
    }
  };

  const getHighlightedText = (text: string, spanId: string | null) => {
    if (!spanId) return text;

    const [startIndex, endIndex] = spanId.split('#').map(Number);
    const words = text.split(' ');

    return words.map((word, index) => (
      <span
        key={index}
        className={index >= startIndex && index <= endIndex ? 'bg-green-300' : ''}
      >
        {word}
      </span>
    ));
  };



  return (
    <div className="comments-class">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 justify-items-center gap-10">
        <div className="container shadow p-10 cursor-auto w-full overflow-auto">
          {transcriptEntries}
        </div>
        <div className="container shadow p-10 cursor-auto w-full overflow-auto">
          {showTextarea && (
            <CommentForm
              handleSubmit={addComment}
              spanId={currentWordId as string}
              spanText={currentWordText}
              transcriptId={transcriptId}
            />
          )}
          <div id="commentsContainer">
            {loading ? (
              <p>Loading comments...</p> // Show loading indicator
            ) : backendComments.length > 0 ? (
              backendComments.map((comment) => (
                <Comment
                  key={comment.SpanId}
                  spanId={comment.SpanId}
                  commentText={comment.commentText}
                  spanText={comment.spanText}
                  onHover={handleWordHover}
                  onLeave={() => handleWordLeave(comment.SpanId)}
                />
              ))
            ) : (
              <p>No comments found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
