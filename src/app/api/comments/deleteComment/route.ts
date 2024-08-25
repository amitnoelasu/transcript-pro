import { NextRequest, NextResponse } from "next/server";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  BatchGetItemCommand, 
  BatchGetItemCommandInput,
  DeleteItemCommand, 
  DeleteItemCommandInput
} from "@aws-sdk/client-dynamodb";
import transcriptData from "@/app/transcripts.json";
import { v4 as uuidv4 } from "uuid";

export async function DELETE(req: NextRequest) {
    //{transcriptId, comment, spanId}:{transcriptId: string, comment: string, spanId: string}
    const data = await req.json();
  
    const client = new DynamoDBClient({ region: "us-east-1" });
    // const uniqueId = uuidv4();
  
    const params: DeleteItemCommandInput = {
      TableName: "Comments",
      Key: {
        TranscriptId: {
          S: data.TranscriptId,
        },
        SpanId: {
          S: data.SpanId,
        },
      },
    };
  
    console.log(JSON.stringify(params));
  
    try {
      const command = new DeleteItemCommand(params);
      const response = await client.send(command);
    
      if (response) {
        return NextResponse.json(
          { message: "Comment deleted successfully" },
          { status: 200 }
        );
      } else {
        // If for some reason response is not defined, return an error
        return NextResponse.json(
          { message: "Failed to delete comment" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
  