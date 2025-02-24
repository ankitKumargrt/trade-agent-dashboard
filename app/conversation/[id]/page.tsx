import { ElevenLabsClient } from "elevenlabs"
import { ConversationDetail } from "../../../components/conversation-detail"

export default async function ConversationPage({ params }: { params: { id: string } }) {
  const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY })
  const conversation = await client.conversationalAi.getConversation(params.id)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Conversation Details</h1>
      <ConversationDetail conversation={conversation} />
    </div>
  )
}

