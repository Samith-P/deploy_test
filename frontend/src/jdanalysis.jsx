import { useState } from "react";

function JDAnalysis() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeJD = async () => {
    if (jd.trim().length < 20) {
      setError("Please enter a valid job description");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/analysis/jdanalysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          jobDescription: jd,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "JD analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h2>Job Description Analysis</h2>

      {/* Input */}
      <textarea
        rows={12}
        style={{ width: "100%" }}
        placeholder="Paste the job description here..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <button onClick={analyzeJD} disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Analyzing..." : "Analyze JD"}
      </button>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Result */}
      {result && (
        <div style={{ marginTop: "30px" }}>
          <Section title="Required Technical Skills" items={result.required_technical_skills} />
          <Section title="Recommended Certifications" items={result.recommended_certifications} />
          <Section title="Suggested Projects" items={result.suggested_projects} />
        </div>
      )}
    </div>
  );
}

/* Reusable list section */
function Section({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default JDAnalysis;