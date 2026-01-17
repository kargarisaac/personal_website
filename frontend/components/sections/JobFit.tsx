"use client";

import { FormEvent, useState } from "react";

import { requestJobFit } from "@/lib/api";
import { JobFitResult } from "@/lib/types";

export default function JobFit() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<JobFitResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!description.trim() || status === "loading") {
      return;
    }

    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const data = await requestJobFit(description.trim());
      setResult(data);
    } catch {
      setError("Job-fit service unavailable. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="section" id="job-fit">
      <div className="section-header">
        <div>
          <div className="kicker">Fit Check</div>
          <h2 className="section-title">Paste a job description</h2>
        </div>
        <p className="section-lede">
          Get a candid match assessment with evidence and gaps before investing
          more time.
        </p>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <textarea
            rows={6}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Paste the role requirements here..."
          />
          <button className="btn btn-primary" type="submit">
            {status === "loading" ? "Analyzing..." : "Analyze fit"}
          </button>
        </form>
        {error ? <div className="pill">{error}</div> : null}
        {result ? (
          <div className="jobfit-result">
            <div className="pill">Rating: {result.rating}</div>
            <div>{result.summary}</div>
            <div>
              <strong>Evidence</strong>
              <ul style={{ marginTop: 8, display: "grid", gap: 6 }}>
                {result.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Gaps</strong>
              <ul style={{ marginTop: 8, display: "grid", gap: 6 }}>
                {result.gaps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
