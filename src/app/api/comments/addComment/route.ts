import { NextRequest, NextResponse } from "next/server";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  BatchGetItemCommand, 
  BatchGetItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import transcriptData from "@/app/transcripts.json";
import { v4 as uuidv4 } from "uuid";



export function UPDATE() {
  return new NextResponse();
}

export function DELETE() {
  return new NextResponse();
}

export async function POST(req: NextRequest) {
  //{transcriptId, comment, spanId}:{transcriptId: string, comment: string, spanId: string}
  const data = await req.json();

  const client = new DynamoDBClient({ region: "us-east-1" });
  // const uniqueId = uuidv4();

  const params: PutItemCommandInput = {
    TableName: "Comments",
    Item: {
      TranscriptId: {
        S: data.TranscriptId,
      },
      SpanId: {
        S: data.SpanId,
      },
      comment: {
        S: data.commentText,
      },
      spanText: {
        S: data.spanText
      }
    },
  };

  console.log(JSON.stringify(params));

  try {
    const command = new PutItemCommand(params);
    const response = await client.send(command);
    return NextResponse.json({ message: "Comment added successfully" }, { status: 200 });
    // console.log("Item inserted successfully");
  } catch (error) {
    console.error("Error inserting comment:", error);
  }
}
