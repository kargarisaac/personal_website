import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div style={{ fontWeight: 600 }}>{profile.name}</div>
        <div>{profile.title}</div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a className="pill" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="pill" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
