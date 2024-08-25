import { NextRequest, NextResponse } from "next/server";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  QueryCommandInput,
  QueryCommand,
  GetItemCommandInput,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import transcriptData from "@/app/transcripts.json";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const client = new DynamoDBClient({ region: "us-east-1" });
    
    const params: GetItemCommandInput = {
        TableName: "Transcripts",
        Key: {
          TranscriptId: {
            S: data.TranscriptId,
          },
        },
      };
    
      console.log(JSON.stringify(params));
    
      try {
        const command = new GetItemCommand(params);
        const response = await client.send(command);
        

        if (response) {
            // console.log("response", JSON.stringify(response.Item?.conversation.L));
          return NextResponse.json(
            { transcriptJson: response.Item?.conversation.L },
            { status: 200 }
          );
        } else {
          // If for some reason response is not defined, return an error
          return NextResponse.json(
            { message: "Failed to retrieve JSON" },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error("Failed to retrieve JSON:", error);
      }
    
  
  }
  