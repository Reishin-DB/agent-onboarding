import { useNavigate } from "react-router-dom";

const STAGES = [
  { icon: "📋", label: "Attract & Hire", desc: "Requisition, approve, provision a service principal", to: "/hiring" },
  { icon: "🪪", label: "Onboard", desc: "Identity, sandbox access, probation period", to: "/onboarding" },
  { icon: "🎓", label: "Train & Develop", desc: "Feedback loops, MLflow experiments, model promotion", to: "/training" },
  { icon: "📊", label: "Performance Review", desc: "Metrics, evaluations, coaching pipelines", to: "/performance" },
  { icon: "🚀", label: "Promote & Grow", desc: "Broader access, new tools, lateral moves", to: "/promotions" },
  { icon: "📦", label: "Offboard & Retire", desc: "Revoke access, archive models, preserve lineage", to: "/offboarding" },
];

const agents = [
  { avatar: "🩺", name: "HEALTH", color: "#ef4444" },
  { avatar: "🔧", name: "MAINT", color: "#f59e0b" },
  { avatar: "📦", name: "SUPPLY", color: "#3b82f6" },
  { avatar: "👷", name: "CREW", color: "#10b981" },
  { avatar: "⛽", name: "DRILLING", color: "#8b5cf6" },
];

export default function WelcomePage() {
  const nav = useNavigate();
  return (
    <div className="hero">
      <h1 className="page-title">
        Your AI Agents Need an&nbsp;HR&nbsp;Department
      </h1>
      <p className="page-subtitle">
        Humans get hired, onboarded, trained, reviewed, promoted, and retired with governance
        at every step. AI agents deserve the exact same lifecycle — built entirely on
        Databricks Unity Catalog, MLflow, and Jobs.
      </p>

      {/* ── The 5 Agents ── */}
      <div className="hero-visual">
        {agents.map((a) => (
          <div className="hero-agent" key={a.name} style={{ borderColor: a.color + "40" }}>
            <span className="avatar">{a.avatar}</span>
            <span className="name">{a.name}</span>
          </div>
        ))}
        <span className="hero-arrow">→</span>
        <div className="hero-gate">
          <span className="gate-icon">🏢</span>
          <span className="gate-label">Agent HR</span>
        </div>
      </div>

      {/* ── Problem / Solution ── */}
      <div className="divider-section">
        <div className="divider-line" />
        <span className="divider-label">THE PROBLEM</span>
        <div className="divider-line" />
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: 0, alignItems: "stretch" }}>
          <div className="card comparison-card">
            <div style={{ fontSize: 28, marginBottom: 12 }}>👤</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>New Employee</h3>
            <ul className="comparison-list">
              <li><span className="check">✓</span> Background check & approval</li>
              <li><span className="check">✓</span> SSO account provisioned</li>
              <li><span className="check">✓</span> Role-based access only</li>
              <li><span className="check">✓</span> 90-day probation period</li>
              <li><span className="check">✓</span> Quarterly performance reviews</li>
              <li><span className="check">✓</span> Formal offboarding process</li>
            </ul>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20, color: "var(--text-dim)" }}>vs</span>
          </div>
          <div className="card comparison-card" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🤖</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>New AI Agent (today)</h3>
            <ul className="comparison-list">
              <li><span className="cross">✕</span> No approval process</li>
              <li><span className="cross">✕</span> Shared service account</li>
              <li><span className="cross">✕</span> Full access to everything</li>
              <li><span className="cross">✕</span> No probation or guardrails</li>
              <li><span className="cross">✕</span> No performance tracking</li>
              <li><span className="cross">✕</span> Abandoned, never cleaned up</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── The Full Lifecycle ── */}
      <div className="divider-section">
        <div className="divider-line" />
        <span className="divider-label">THE AGENT EMPLOYEE LIFECYCLE</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        Six stages. Each one maps HR best practices to concrete Databricks primitives —
        Unity Catalog grants, MLflow model registry, Delta tables, and scheduled Jobs.
        No new frameworks. Just the governance model you already have.
      </p>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="lifecycle-grid">
          {STAGES.map((s, i) => (
            <div
              key={s.label}
              className="card lifecycle-card"
              onClick={() => nav(s.to)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div className="lifecycle-num">{i + 1}</div>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="divider-section">
        <div className="divider-line" />
        <span className="divider-label">BUILT ON DATABRICKS</span>
        <div className="divider-line" />
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
          {[
            { stat: "5", label: "AI Agents", detail: "Distinct lifecycle stages" },
            { stat: "8", label: "HR Tables", detail: "Delta Lake on UC" },
            { stat: "6", label: "Lifecycle Stages", detail: "Hire to retire" },
            { stat: "100%", label: "Auditable", detail: "Every action logged" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--accent)" }}>{s.stat}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="interstitial-text">
        This demo walks you through a real-world BOP (Blowout Preventer) monitoring system
        with five AI agents. Each agent has a distinct role, risk profile, and lifecycle stage —
        <strong> exactly like a team of human specialists on an oil platform</strong>.
      </p>

      <div className="cta-row">
        <button className="btn btn-primary" onClick={() => nav("/team")}>
          Meet the 5 Agents →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/hiring")}>
          Start the Lifecycle Journey
        </button>
      </div>
    </div>
  );
}
