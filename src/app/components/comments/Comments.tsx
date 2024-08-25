import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { AppProps } from "next/app";
import { Textarea } from "@nextui-org/react";
import { Transcript, TranscriptEntry, BackendComments } from "../../types";
import transcriptData from "../../transcripts.json";
// import AddComment from "../components/AddComment";



export const Comments = ({ transcriptId }: { transcriptId: string }) => {
    console.log("trancsriptId", transcriptId)
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

  async function fetchTranscriptJson() {
    try {
      const response = await fetch("/api/fetchTranscriptJson", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          TranscriptId: transcriptId,
        }),
      });
      if (response.ok) {
        // Re-fetch comments after successfully adding a new one
        // console.log(JSON.stringify(response)) 
        const data = await response.json();

        const transcriptEntriesTemp: TranscriptEntry[] = data.transcriptJson.map((item: any) => {
          return {
            time: item.M.time.S,
            speaker: item.M.speaker.S,
            text: item.M.text.S,
          };
        });
        
        // Update state with the transformed data
        setTranscript(transcriptEntriesTemp);
        // console.log("transcript ---- ", transcriptEntriesTemp);
  
        // setTranscript(data.transcriptJson);
        // console.log("transcript ---- ", transcript)
      } else {
        console.error("Failed to load");
      }
    } catch (error) {
      console.error("Error loading", error);
    }
  }

  
  

  useEffect(() => {
    fetchTranscriptJson();
  }, [transcriptId]);
  
  function loadTranscript() {
    // console.log("transcript", JSON.stringify(transcript));
  
    const entries = transcript.map((entry, entryIndex) => {
      const words = entry.text.split(" ").map((word, wordIndex) => (
        <span
          key={formatId(entryIndex, wordIndex)}
          id={formatId(entryIndex, wordIndex)}
          className="inline-block mx-1 hover:bg-sky-700"
          onClick={handleWordClick}
          // onMouseUp={handleMouseUp}
          style={{ display: 'inline-flex' }}
        >
          {word}
        </span>
      ));

      return (
        <div key={entryIndex} className="mb-2">
    <div className="bg-gray-700 text-white p-2 rounded-lg mb-1 inline-block">
      <span className="font-semibold text-lg">{`[${entry.time}]`}</span>
      <span className="font-semibold text-lg ml-2">{entry.speaker}</span>
    </div>
    {words}
  </div>
      );
    });

    setTranscriptEntries(entries);
  }

  useEffect(() => {
    loadTranscript();
  }, [transcript]);

  function handleWordClick(e: React.MouseEvent<HTMLSpanElement>) {
    console.log("Clicked word:", e.currentTarget.textContent);
    const clickedWord = e.currentTarget.textContent || "";
    const spanId = e.currentTarget.id;

    setCurrentWordText(clickedWord);
    setCurrentWordId(spanId);
    setShowTextarea(true);
  }

  function handleMouseUp(e: React.MouseEvent<HTMLSpanElement>) {
    if (window.getSelection()?.toString()) {
      handleWordClick(e); 
    }
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
        setCommentInitialValue("");
        await getCommentsFromDb();
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const closeTextArea = () => {
    setShowTextarea(false);
  }
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

  // const updateComment = async (updatedComment: string, commentId: string) => {
  //   const response = await fetch("/api/comments", {
  //     method: "UPDATE",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       updatedComment: updatedComment,
  //       commendId: commentId,
  //     }),
  //   });
  // };

  
  useEffect(() => {
    getCommentsFromDb();
  }, []);

  const [highlightSpanId, setHighlightSpanId] = useState<string | null>(null);
  const handleWordHover = (spanId: string) => {
    const element = document.getElementById(spanId);
    if (element) {
      element.style.backgroundColor = '#6b46c1'; 
    }
  };
  
  const handleWordLeave = (spanId: string) => {
    const element = document.getElementById(spanId);
    if (element) {
      element.style.backgroundColor = ''; 
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

  const [formData, setFormData] = useState<{ commentText: string, spanId: string }>({ commentText: '', spanId: '' });

  const [isFormVisible, setFormVisible] = useState(false);
  const [commentInitialValue, setCommentInitialValue] = useState<string>("");
  const handleEdit = (commentText: string, spanText: string, spanId: string) => {
    setCurrentWordText(spanText);
    setCurrentWordId(spanId);
    setCommentInitialValue(commentText);
    setShowTextarea(true); // Show the CommentForm
  };

  const deleteComment = async (commentText: string, spanText: string, spanId: string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      const response = await fetch("/api/comments/deleteComment", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ TranscriptId: transcriptId, SpanId: spanId }),
      });

      if(response.ok) {
        await getCommentsFromDb();
        handleWordLeave(spanId);
      }
    }
  };



  return (
    <div className="comments-class bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center max-h-screen overflow-hidden" style={{ height: '100vh', overflow: 'auto' }}>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 justify-items-center gap-10 w-3/4 h-3/4 overflow-hidden" style={{ height: '90vh', overflow: 'auto' }}>
        {/* Transcript Entries Container */}
        <div className="container shadow-lg p-6 cursor-auto  overflow-scroll bg-gray-900 text-white rounded-lg h-3/4 custom-scrollbar">
          {transcriptEntries}
        </div>
  
        {/* Comments and Comment Form Container */}
        <div className="container shadow-lg p-6 cursor-auto overflow-scroll bg-gray-900 text-white rounded-lg  h-3/4 custom-scrollbar">
          {showTextarea && (
            <CommentForm
              handleSubmit={addComment}
              spanId={currentWordId as string}
              spanText={currentWordText}
              transcriptId={transcriptId}
              closeTextArea={closeTextArea}
              initialValue={commentInitialValue}
            />
          )}
  
          {/* Comments Section */}
          <div id="commentsContainer" className="mt-4">
            {loading ? (
              <p className="text-gray-600 italic">Loading comments...</p> // Show loading indicator
            ) : backendComments.length > 0 ? (
              backendComments.map((comment) => (
                <Comment
                  key={comment.SpanId}
                  spanId={comment.SpanId}
                  commentText={comment.commentText}
                  spanText={comment.spanText}
                  onHover={handleWordHover}
                  onLeave={() => handleWordLeave(comment.SpanId)}
                  onEdit={handleEdit}
                  onDelete={deleteComment}
                />
              ))
            ) : (
              <p className="text-gray-500">No comments found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Comments;
