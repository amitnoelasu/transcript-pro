
import { NextRequest, NextResponse } from "next/server";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  QueryCommandInput,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import transcriptData from "@/app/transcripts.json";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const data = await req.json();
    // console.log("im here", data)
    const client = new DynamoDBClient({ region: "us-east-1" });

    try {
        // Define query parameters
        const params: QueryCommandInput = {
          TableName: 'Comments',
          KeyConditionExpression: 'TranscriptId = :transcriptId',
          ExpressionAttributeValues: {
            ':transcriptId': { S: data.transcriptId },
          },
          ScanIndexForward: true, // true for ascending order by sort key, false for descending
        };
    
        // Execute the query
        const command = new QueryCommand(params);
        const response = await client.send(command);
    
        // Check if items exist and log them
        if (response.Items) {
          console.log('Comments:', response.Items);
          const comments = response.Items.map((item) => {
            return {
              TranscriptId: item.TranscriptId.S,
              SpanId: item.SpanId.S, // Assuming spanId is a number
              commentText: item.comment.S, // Assuming commentText is the attribute for comment content
              spanText: item.spanText.S
            };
          });
    
          return NextResponse.json(comments); // Return the comments as JSON
        } else {
          console.log('No comments found for the given TranscriptId');
          return [];
        }
      } catch (error) {
        console.error('Error retrieving comments:', error);
        throw error;
      }
}