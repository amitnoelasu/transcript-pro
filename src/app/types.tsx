export interface TranscriptEntry {
    time: string;
    speaker: string;
    text: string;
}

export interface CommentObjectType {
    commentText: string;
    spanText: string;
    SpanId: string;
    TranscriptId: string;
  }

export type BackendComments = CommentObjectType[]; 
// Define the type for the transcript, which is an array of transcript entries
export interface Transcript {
    transcript: TranscriptEntry[];
}