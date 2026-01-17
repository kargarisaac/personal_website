import { publications } from "@/lib/content";

export default function Publications() {
  return (
    <section className="section" id="publications">
      <div className="section-header">
        <div>
          <div className="kicker">Publications</div>
          <h2 className="section-title">Research & written work</h2>
        </div>
        <p className="section-lede">
          Short-form memos and research notes that highlight systems thinking.
        </p>
      </div>
      <div className="card publication-list">
        {publications.map((pub) => (
          <div key={pub.title}>
            <div style={{ fontWeight: 600 }}>{pub.title}</div>
            <div style={{ color: "var(--ink-2)", marginTop: 4 }}>
              {pub.venue} · {pub.year}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
