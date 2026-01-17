import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatSection() {
  return (
    <section className="section" id="chat">
      <div className="section-header">
        <div>
          <div className="kicker">Conversation</div>
          <h2 className="section-title">Ask the AI about Isaac</h2>
        </div>
        <p className="section-lede">
          Stream grounded answers drawn from curated resume notes. The model
          cites only what is documented and flags uncertainty.
        </p>
      </div>
      <div className="chat-shell">
        <ChatWindow />
        <div className="card">
          <div className="kicker">How it works</div>
          <p className="section-lede">
            The assistant reads local markdown sources (resume, LinkedIn, and
            project notes). Streaming begins within seconds, with a toggle for
            deeper technical detail.
          </p>
          <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            <div className="pill">Grounded in curated files</div>
            <div className="pill">Honest about gaps</div>
            <div className="pill">Designed for hiring managers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
