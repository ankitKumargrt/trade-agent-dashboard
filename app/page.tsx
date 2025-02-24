import { ElevenLabsClient } from "elevenlabs";
import { ConversationList } from "../components/conversation-list";

export default async function Home() {
  const client = new ElevenLabsClient({
    apiKey: process.env.NEXT_PUBLIC_AGENT_API_KEY,
  });
  const conversations = await client.conversationalAi.getConversations({
    agent_id: process.env.NEXT_PUBLIC_VOICE_API_KEY,
  });

  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>
        Conversation Dashboard
      </h1>
      <ConversationList conversations={conversations.conversations} />
    </main>
  );
}
