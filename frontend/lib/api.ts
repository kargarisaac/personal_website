import { ChatMessage, JobFitResult } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type StreamChatOptions = {
  message: string;
  sessionId?: string | null;
  history: ChatMessage[];
  revealDetail: boolean;
  onToken: (token: string) => void;
  onMeta: (sessionId: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
};

export async function streamChat(options: StreamChatOptions) {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: options.message,
      session_id: options.sessionId ?? undefined,
      history: options.history,
      reveal_detail: options.revealDetail,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error("Chat service unavailable.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      const line = frame
        .split("\n")
        .find((item) => item.startsWith("data:"));
      if (!line) {
        continue;
      }
      const payload = line.replace(/^data:\s*/, "");
      try {
        const event = JSON.parse(payload) as {
          type: "meta" | "token" | "done" | "error";
          content?: string;
          session_id?: string;
        };
        if (event.type === "meta" && event.session_id) {
          options.onMeta(event.session_id);
        }
        if (event.type === "token" && event.content) {
          options.onToken(event.content);
        }
        if (event.type === "error") {
          options.onError(event.content ?? "Chat service error.");
          return;
        }
        if (event.type === "done") {
          options.onDone();
        }
      } catch {
        // Ignore malformed chunks from the stream.
      }
    }
  }
}

export async function requestJobFit(description: string): Promise<JobFitResult> {
  const response = await fetch(`${API_BASE_URL}/api/job-fit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    throw new Error("Job-fit service unavailable.");
  }

  return response.json();
}
