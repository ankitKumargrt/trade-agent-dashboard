import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { ConversationSummaryResponseModel } from "elevenlabs/api";

type Conversation = {
  conversation_id: string;
  agent_name?: string; // Make this optional
  start_time_unix_secs: number;
  call_duration_secs: number;
  status: string;
};

export function ConversationList({
  conversations,
}: {
  conversations: ConversationSummaryResponseModel[];
}) {
  return (
    <div className='grid gap-4'>
      {conversations.map((conversation) => (
        <Link
          key={conversation.conversation_id}
          href={`/conversation/${conversation.conversation_id}`}
          className='block p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow'>
          <h2 className='text-xl font-semibold'>
            {conversation.agent_name || "Unnamed Agent"}
          </h2>
          <p className='text-gray-600'>
            Started{" "}
            {formatDistanceToNow(
              new Date(conversation.start_time_unix_secs * 1000)
            )}{" "}
            ago
          </p>
          <p className='text-gray-600'>
            Duration: {conversation.call_duration_secs} seconds
          </p>
          <p className='text-gray-600'>Status: {conversation.status}</p>
        </Link>
      ))}
    </div>
  );
}
