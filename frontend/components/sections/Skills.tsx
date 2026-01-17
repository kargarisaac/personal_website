import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-header">
        <div>
          <div className="kicker">Skills Dashboard</div>
          <h2 className="section-title">Strengths, moderate, gaps</h2>
        </div>
        <p className="section-lede">
          A candid view of where Isaac excels, where he is solid, and where he
          is intentionally transparent.
        </p>
      </div>
      <div className="grid-3">
        {skills.map((skill) => (
          <div className="card skills-card" key={skill.label}>
            <h3>{skill.label}</h3>
            <p style={{ color: "var(--ink-2)", marginTop: 6 }}>
              {skill.description}
            </p>
            <ul>
              {skill.items.map((item) => (
                <li key={item} className="pill">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
