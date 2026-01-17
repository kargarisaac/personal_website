import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-header">
        <div>
          <div className="kicker">Experience</div>
          <h2 className="section-title">Expand the real context</h2>
        </div>
        <p className="section-lede">
          Each role includes deeper situation-action-outcome context to show the
          thinking behind the metrics.
        </p>
      </div>
      <div className="grid-3">
        {experience.map((entry) => (
          <div className="card experience-card" key={entry.company}>
            <div className="pill">{entry.timeframe}</div>
            <h3 style={{ marginTop: 12 }}>{entry.company}</h3>
            <p style={{ color: "var(--ink-2)", marginTop: 4 }}>
              {entry.title}
            </p>
            <p style={{ marginTop: 12 }}>{entry.summary}</p>
            <details>
              <summary>View AI context</summary>
              <ul style={{ marginTop: 10, display: "grid", gap: 8 }}>
                {entry.context.map((item) => (
                  <li key={item} style={{ color: "var(--ink-1)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
}
