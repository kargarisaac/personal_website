import ChatSection from "@/components/sections/ChatSection";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import JobFit from "@/components/sections/JobFit";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="page">
      <nav className="nav">
        <div className="nav-title">Isaac Kargar</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a className="pill" href="#chat">
            Chat
          </a>
          <a className="pill" href="#experience">
            Experience
          </a>
          <a className="pill" href="#skills">
            Skills
          </a>
          <a className="pill" href="#job-fit">
            Job Fit
          </a>
          <a className="pill" href="#publications">
            Publications
          </a>
        </div>
      </nav>
      <Hero />
      <ChatSection />
      <Experience />
      <Skills />
      <JobFit />
      <Publications />
      <Footer />
    </main>
  );
}
