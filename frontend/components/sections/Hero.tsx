import { highlights, profile } from "@/lib/content";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div>
        <div className="kicker">AI Resume Portfolio</div>
        <h1 className="hero-title">{profile.name}</h1>
        <p className="hero-subtitle">{profile.title}</p>
        <p className="hero-subtitle" style={{ marginTop: 12 }}>
          {profile.summary}
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#chat">
            Start a conversation
          </a>
          <a className="btn" href="#job-fit">
            Check job fit
          </a>
        </div>
        <div style={{ marginTop: 24 }} className="pill">
          {profile.location}
        </div>
      </div>
      <div className="hero-card">
        <div className="kicker">Highlights</div>
        <ul style={{ listStyle: "none", display: "grid", gap: 12 }}>
          {highlights.map((item) => (
            <li key={item} className="pill">
              {item}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
          <a className="btn" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
