import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, QueryCommandInput, QueryCommand } from "@aws-sdk/client-dynamodb";

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log("im here", data);
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
        if (response.Items && response.Items.length > 0) {
          console.log('Comments:', response.Items);
          const comments = response.Items.map((item) => ({
            TranscriptId: item.TranscriptId.S,
            SpanId: item.SpanId.S, // Adjust based on actual data type
            commentText: item.comment.S, // Adjust based on actual data type
            spanText: item.spanText.S // Adjust based on actual data type
          }));

          return NextResponse.json(comments); // Return the comments as JSON
        } else {
          console.log('No comments found for the given TranscriptId');
          return NextResponse.json([]); // Return an empty array as JSON
        }
    } catch (error) {
        console.error('Error retrieving comments:', error);
        return NextResponse.error(); // Return a generic error response
    }
}
