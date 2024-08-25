import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import transcriptData from "@/app/transcripts.json";
import { v4 as uuidv4 } from 'uuid';


interface TranscriptData {
  transcript: {
    speaker: string;
    time: string;
    text: string;
  }[];
}

export async function POST() {
  const client = new DynamoDBClient({ region: 'us-east-1' });
  const uniqueId = uuidv4();

  const params: PutItemCommandInput = {
    TableName: "Transcripts",
    Item: {
      TranscriptId: { "S": uniqueId },
      conversation: {
        L: transcriptData.transcript.map(item => ({
          M: {
            speaker: { S: item.speaker },
            time: { S: item.time },
            text: { S: item.text }
          }
        }))
      }
    }
  };

  try {
    const command = new PutItemCommand(params);
    await client.send(command);
    console.log('Item inserted successfully');
  } catch (error) {
    console.error('Error inserting item:', error);
  }
}



