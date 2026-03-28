import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Agent {
  id: string;
  name: string;
  title: string;
  avatar: string;
  color: string;
  mission: string;
  reads: string[];
  writes: string[];
  uc_grants: string[];
  denied: string[];
  risk_level: string;
  certification: string;
  lifecycle_stage: string;
  hire_date: string;
  department: string;
  performance_score: number;
  actions_logged: number;
  violations: number;
  model_version: string;
  model_stage: string;
}

const STAGE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  probation: { label: "Probation", color: "#f59e0b", icon: "⏳" },
  training: { label: "Training", color: "#3b82f6", icon: "🎓" },
  production: { label: "Production", color: "#10b981", icon: "✅" },
  coaching: { label: "Coaching", color: "#ef4444", icon: "📝" },
  archived: { label: "Archived", color: "#94a3b8", icon: "📦" },
};

export default function MeetTheTeamPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    fetch("/api/agents").then((r) => r.json()).then(setAgents);
  }, []);

  const selectedAgent = agents.find((a) => a.id === selected);

  return (
    <div className="page">
      <h1 className="page-title">Meet the Team</h1>
      <p className="page-subtitle">
        Five AI agents, each at a different lifecycle stage — from probation to production.
        Click an agent to see their full employee profile.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">💡</div>
        <div>
          <strong>Think of it this way:</strong> These five agents are your new hires on a
          BOP monitoring platform. Each one has a role, risk level, data scope, and
          lifecycle stage — just like five human specialists at different points in their career.
        </div>
      </div>

      {/* ── Agent Selector ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">SELECT AN AGENT</span>
        <div className="divider-line" />
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
        {agents.map((a) => {
          const stage = STAGE_LABELS[a.lifecycle_stage] || STAGE_LABELS.production;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(selected === a.id ? null : a.id)}
              className="agent-pill"
              style={{
                background: selected === a.id ? a.color + "30" : "var(--bg-card)",
                borderColor: selected === a.id ? a.color : "var(--border)",
                color: selected === a.id ? a.color : "var(--text)",
              }}
            >
              <span style={{ fontSize: 18 }}>{a.avatar}</span>
              <span>{a.name}</span>
              <span style={{ fontSize: 12, color: stage.color }}>{stage.icon}</span>
            </button>
          );
        })}
      </div>

      {/* ── Expanded Agent Detail ── */}
      {selectedAgent && (() => {
        const stage = STAGE_LABELS[selectedAgent.lifecycle_stage] || STAGE_LABELS.production;
        return (
          <div
            className="card agent-detail-card"
            style={{ marginTop: 20, borderColor: selectedAgent.color + "40" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16, fontSize: 32,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: selectedAgent.color + "18",
              }}>
                {selectedAgent.avatar}
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{selectedAgent.name}</div>
                <div style={{ fontSize: 14, color: "var(--text-dim)" }}>{selectedAgent.title} — {selectedAgent.department}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="badge" style={{
                  background: selectedAgent.risk_level === "critical" ? "rgba(239,68,68,0.15)"
                    : selectedAgent.risk_level === "high" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                  color: selectedAgent.risk_level === "critical" ? "var(--red)"
                    : selectedAgent.risk_level === "high" ? "var(--yellow)" : "var(--green)",
                }}>
                  {selectedAgent.risk_level} risk
                </span>
                <span className="badge" style={{ background: stage.color + "20", color: stage.color }}>
                  {stage.icon} {stage.label}
                </span>
              </div>
            </div>

            <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 20 }}>
              {selectedAgent.mission}
            </p>

            {/* ── Employee Stats ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Hire Date", value: selectedAgent.hire_date },
                { label: "Performance", value: `${selectedAgent.performance_score}%` },
                { label: "Actions Logged", value: selectedAgent.actions_logged.toLocaleString() },
                { label: "Violations", value: String(selectedAgent.violations) },
                { label: "Model Version", value: selectedAgent.model_version },
                { label: "Model Stage", value: selectedAgent.model_stage },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* ── Access Section ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div>
                <div className="access-label">Reads (SELECT)</div>
                <div className="access-tags" style={{ flexDirection: "column" }}>
                  {selectedAgent.reads.map((r) => (
                    <span key={r} className="tag tag-read">SELECT {r}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="access-label">Writes (INSERT)</div>
                <div className="access-tags" style={{ flexDirection: "column" }}>
                  {selectedAgent.writes.map((w) => (
                    <span key={w} className="tag tag-write">INSERT {w}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="access-label">Denied (NO ACCESS)</div>
                <div className="access-tags" style={{ flexDirection: "column" }}>
                  {selectedAgent.denied.map((d) => (
                    <span key={d} className="tag tag-denied">{d}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <span style={{ fontSize: 12, color: "var(--text-dim)" }}>
                <strong>Certification:</strong> {selectedAgent.certification} &nbsp;|&nbsp;
                <strong>UC Grants:</strong> {selectedAgent.uc_grants.length} rules &nbsp;|&nbsp;
                <strong>Lifecycle:</strong> {stage.label}
              </span>
            </div>
          </div>
        );
      })()}

      {/* ── All Agent Cards ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">AGENT ROSTER</span>
        <div className="divider-line" />
      </div>

      <div className="team-grid">
        {agents.map((a) => {
          const stage = STAGE_LABELS[a.lifecycle_stage] || STAGE_LABELS.production;
          return (
            <div
              key={a.id}
              className="card agent-card"
              style={{ "--agent-color": a.color, "--agent-color-bg": a.color + "18" } as React.CSSProperties}
            >
              <div className="agent-header">
                <div className="agent-avatar">{a.avatar}</div>
                <div className="agent-info">
                  <div className="agent-name">{a.name}</div>
                  <div className="agent-title">{a.title}</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <span className="badge" style={{
                    background: a.risk_level === "critical" ? "rgba(239,68,68,0.15)"
                      : a.risk_level === "high" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                    color: a.risk_level === "critical" ? "var(--red)"
                      : a.risk_level === "high" ? "var(--yellow)" : "var(--green)",
                  }}>
                    {a.risk_level} risk
                  </span>
                  <span className="badge" style={{ background: stage.color + "20", color: stage.color, fontSize: 10 }}>
                    {stage.icon} {stage.label}
                  </span>
                </div>
              </div>

              <p className="agent-mission">{a.mission}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div style={{ textAlign: "center", padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: a.performance_score >= 90 ? "var(--green)" : a.performance_score >= 80 ? "var(--yellow)" : "var(--red)" }}>
                    {a.performance_score}%
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-dim)" }}>Performance</div>
                </div>
                <div style={{ textAlign: "center", padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{(a.actions_logged / 1000).toFixed(1)}k</div>
                  <div style={{ fontSize: 10, color: "var(--text-dim)" }}>Actions</div>
                </div>
                <div style={{ textAlign: "center", padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: a.violations === 0 ? "var(--green)" : "var(--red)" }}>
                    {a.violations}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-dim)" }}>Violations</div>
                </div>
              </div>

              <div className="access-section">
                <div className="access-label">Data Access</div>
                <div className="access-tags">
                  {a.reads.map((r) => <span key={r} className="tag tag-read">SELECT {r}</span>)}
                  {a.writes.map((w) => <span key={w} className="tag tag-write">INSERT {w}</span>)}
                </div>
              </div>

              <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-dim)" }}>
                <strong>Model:</strong> {a.model_version} ({a.model_stage}) &nbsp;|&nbsp;
                <strong>Hired:</strong> {a.hire_date}
              </div>
            </div>
          );
        })}
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/hiring")}>
          See How They Were Hired →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/architecture")}>
          View the Architecture
        </button>
      </div>
    </div>
  );
}
