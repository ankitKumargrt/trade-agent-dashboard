"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ElevenLabsClient } from "elevenlabs"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

type Transcript = {
  role: string
  time_in_call_secs: number
  message: string
}

type Conversation = {
  agent_id: string
  conversation_id: string
  status: string
  transcript: Transcript[]
  metadata: {
    start_time_unix_secs: number
    call_duration_secs: number
  }
}

export function ConversationDetail({ conversation }: { conversation: Conversation }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const router = useRouter()

const playAudio = async (): Promise<void> => {
  try {
    if (!audio) {
      const client = new ElevenLabsClient({
        apiKey: process.env.NEXT_PUBLIC_VOICE_API_KEY,
      });
      const audioBlob: Blob =
        await client.conversationalAi.getConversationAudio(
          conversation.conversation_id
        );
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.play();
    } else {
      audio.play();
    }
    setIsPlaying(true);
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};


  const pauseAudio = () => {
    if (audio) {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const deleteConversation = async () => {
    const client = new ElevenLabsClient({
      apiKey: process.env.NEXT_PUBLIC_VOICE_API_KEY
    });
    await client.conversationalAi.deleteConversation(conversation.conversation_id)
    router.push("/")
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Conversation {conversation.conversation_id}</h2>
      <p className="text-gray-600 mb-2">Status: {conversation.status}</p>
      <p className="text-gray-600 mb-4">
        Started {formatDistanceToNow(new Date(conversation.metadata.start_time_unix_secs * 1000))} ago (Duration:{" "}
        {conversation.metadata.call_duration_secs} seconds)
      </p>

      {/* <div className="mb-6">
        <Button onClick={isPlaying ? pauseAudio : playAudio} className="mr-4">
          {isPlaying ? "Pause" : "Play"} Audio
        </Button>
        <Button variant="destructive" onClick={deleteConversation}>
          Delete Conversation
        </Button>
      </div> */}

      <h3 className="text-xl font-semibold mb-2">Transcript</h3>
      <div className="space-y-4">
        {conversation.transcript.map((entry, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">{entry.role}</p>
            <p className="text-gray-600">Time: {entry.time_in_call_secs} seconds</p>
            <p>{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

