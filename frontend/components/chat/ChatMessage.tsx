import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChatMessage as ChatMessageType } from "@/lib/types";

export default function ChatMessage({
  message,
}: {
  message: ChatMessageType;
}) {
  return (
    <div className={`chat-message ${message.role}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
