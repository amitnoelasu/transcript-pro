import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON request body
    const data = await req.json();

    const client = new DynamoDBClient({ region: "us-east-1" });

    // Define the parameters for the DynamoDB PutItemCommand
    const params: PutItemCommandInput = {
      TableName: "Comments",
      Item: {
        TranscriptId: { S: data.TranscriptId },
        SpanId: { S: data.SpanId },
        comment: { S: data.commentText },
        spanText: { S: data.spanText }
      },
    };

    // Log the parameters (for debugging)
    console.log(JSON.stringify(params));

    // Create and send the PutItemCommand
    const command = new PutItemCommand(params);
    await client.send(command);

    // Return a success response
    return NextResponse.json({ message: "Comment added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error inserting comment:", error);
    // Return an error response
    return NextResponse.json({ message: "Failed to add comment" }, { status: 500 });
  }
}
