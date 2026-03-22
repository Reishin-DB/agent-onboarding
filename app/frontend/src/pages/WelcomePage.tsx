import { useNavigate } from "react-router-dom";

const agents = [
  { avatar: "🩺", name: "HEALTH" },
  { avatar: "🔧", name: "MAINT" },
  { avatar: "📦", name: "SUPPLY" },
  { avatar: "👷", name: "CREW" },
  { avatar: "⛽", name: "DRILLING" },
];

export default function WelcomePage() {
  const nav = useNavigate();
  return (
    <div className="hero">
      <h1 className="page-title">
        Your AI Agents Need an&nbsp;HR&nbsp;Department
      </h1>
      <p className="page-subtitle">
        You wouldn't give a new hire admin access on Day 1. Why are we doing
        that with AI agents? It's time to onboard agents with the same
        governance model we use for people.
      </p>

      {/* ── Hero Visual: agents → UC gate ── */}
      <div className="hero-visual">
        {agents.map((a) => (
          <div className="hero-agent" key={a.name}>
            <span className="avatar">{a.avatar}</span>
            <span className="name">{a.name}</span>
          </div>
        ))}
        <span className="hero-arrow">→</span>
        <div className="hero-gate">
          <span className="gate-icon">🔐</span>
          <span className="gate-label">Unity Catalog</span>
        </div>
      </div>

      {/* ── The Problem Statement ── */}
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
              <li><span className="check">✓</span> Gets an SSO account</li>
              <li><span className="check">✓</span> HR assigns a role</li>
              <li><span className="check">✓</span> Access scoped to role</li>
              <li><span className="check">✓</span> Every action is logged</li>
              <li><span className="check">✓</span> Manager reviews access quarterly</li>
            </ul>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20, color: "var(--text-dim)" }}>vs</span>
          </div>
          <div className="card comparison-card" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🤖</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>New AI Agent (today)</h3>
            <ul className="comparison-list">
              <li><span className="cross">✕</span> Shared service account</li>
              <li><span className="cross">✕</span> No defined role</li>
              <li><span className="cross">✕</span> Full read access to everything</li>
              <li><span className="cross">✕</span> Actions not attributed</li>
              <li><span className="cross">✕</span> No one reviews what it touches</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="interstitial-text">
        The average enterprise deploys <strong>5–15 AI agents</strong> per business unit.
        Each one reads data, makes decisions, and takes actions. Without governance,
        every agent is a <strong>superuser with no audit trail</strong>.
      </p>

      {/* ── The Solution: 3 Steps ── */}
      <div className="divider-section">
        <div className="divider-line" />
        <span className="divider-label">THE SOLUTION</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        Unity Catalog applies the same governance model you already use for people —
        <strong> identity, access control, and audit</strong> — to every AI agent in your organization.
      </p>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "center" }}>
          {[
            { num: "01", label: "Identity", desc: "Service principals give each agent a unique, traceable identity — just like an employee's SSO login.", icon: "🪪" },
            { num: "02", label: "Access", desc: "GRANT and DENY at the table, column, and row level. Each agent gets only the data it needs.", icon: "🔑" },
            { num: "03", label: "Audit", desc: "System tables log every query, every access, every denial. Full lineage from data to decision.", icon: "📋" },
          ].map((s) => (
            <div key={s.num} className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>Step {s.num}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── The Proof: Stats ── */}
      <div className="divider-section">
        <div className="divider-line" />
        <span className="divider-label">BY THE NUMBERS</span>
        <div className="divider-line" />
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
          {[
            { stat: "5", label: "AI Agents", detail: "Specialized roles" },
            { stat: "7", label: "Data Assets", detail: "Governed by UC" },
            { stat: "15+", label: "Grant Rules", detail: "Table & column level" },
            { stat: "100%", label: "Audit Coverage", detail: "Every query logged" },
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
        with five AI agents. Each agent has a distinct role, distinct data needs, and distinct
        risk profile — <strong>exactly like a team of human specialists</strong>.
      </p>

      {/* ── CTAs ── */}
      <div className="cta-row">
        <button className="btn btn-primary" onClick={() => nav("/team")}>
          Meet the 5 Agents →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/architecture")}>
          View the Architecture
        </button>
      </div>
    </div>
  );
}
