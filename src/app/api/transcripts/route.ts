import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import transcriptData from "@/app/transcripts.json";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

interface TranscriptData {
  transcript: {
    speaker: string;
    time: string;
    text: string;
  }[];
}

export async function POST() {
  const client = new DynamoDBClient({ region: "us-east-1" });
  const uniqueId = uuidv4();

  const params: PutItemCommandInput = {
    TableName: "Transcripts",
    Item: {
      TranscriptId: { S: uniqueId },
      conversation: {
        L: transcriptData.transcript.map((item) => ({
          M: {
            speaker: { S: item.speaker },
            time: { S: item.time },
            text: { S: item.text },
          },
        })),
      },
    },
  };

  try {
    const command = new PutItemCommand(params);
    await client.send(command);
    console.log("Item inserted successfully");
  } catch (error) {
    console.error("Error inserting item:", error);
  }
}

export async function GET() {
  const client = new DynamoDBClient({ region: "us-east-1" });

  const params: ScanCommandInput = {
    TableName: "Transcripts",
    AttributesToGet: [
      "TranscriptId",
    ],
  };
  try {
  const command = new ScanCommand(params);
  const response = await client.send(command);
  if (response.Items) {
    console.log('Comments:', response.Items);
    const transcripts = response.Items.map((item) => {
      return {
        TranscriptId: item.TranscriptId.S,
      };
    });
    console.log("Transcripts retrieved successfully", transcripts);
    return NextResponse.json(transcripts); // Return the comments as JSON
  } else {
    console.log('No comments found for the given TranscriptId');
    return [];
  }
  
} catch (error) {
  console.error("Error retreiving transcripts: ", error);
}
}
