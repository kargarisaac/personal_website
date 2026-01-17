"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { streamChat } from "@/lib/api";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import ChatMessage from "./ChatMessage";

const INITIAL_MESSAGE: ChatMessageType = {
  role: "assistant",
  content:
    "Ask me about Isaac's multi-agent systems, LLM work, or research experience.",
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [revealDetail, setRevealDetail] = useState(false);
  const [status, setStatus] = useState<"idle" | "streaming">("idle");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || status === "streaming") {
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setStatus("streaming");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    try {
      await streamChat({
        message: userMessage,
        sessionId,
        history: messages.filter((message) => message.content.trim().length > 0),
        revealDetail,
        onMeta: (newSessionId) => setSessionId(newSessionId),
        onToken: (token) => {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (!last || last.role !== "assistant") {
              return prev;
            }
            next[next.length - 1] = {
              ...last,
              content: `${last.content}${token}`,
            };
            return next;
          });
        },
        onDone: () => setStatus("idle"),
        onError: (message) => {
          setError(message);
          setStatus("idle");
        },
      });
    } catch {
      setError("Chat service unavailable. Please try again soon.");
      setStatus("idle");
    }
  };

  return (
    <div className="chat-window card">
      <div className="kicker">AI Resume Chat</div>
      <div className="chat-messages" ref={scrollRef}>
        {messages.map((message, index) => (
          <ChatMessage key={`${message.role}-${index}`} message={message} />
        ))}
        {status === "streaming" && (
          <div className="pill">Streaming response…</div>
        )}
      </div>
      {error ? <div className="pill">{error}</div> : null}
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Ask about platform wins, AI work, or outcomes..."
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
      <label className="pill" style={{ alignSelf: "flex-start" }}>
        <input
          type="checkbox"
          checked={revealDetail}
          onChange={(event) => setRevealDetail(event.target.checked)}
          style={{ marginRight: 8 }}
        />
        Reveal deeper technical detail
      </label>
    </div>
  );
}
