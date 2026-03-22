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
}

export default function MeetTheTeamPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then(setAgents);
  }, []);

  const selectedAgent = agents.find((a) => a.id === selected);

  return (
    <div className="page">
      <h1 className="page-title">Meet the Team</h1>
      <p className="page-subtitle">
        Five AI agents, each with a distinct role, data needs, and risk profile
        — just like five new hires on their first day.
      </p>

      {/* ── Context: The Analogy ── */}
      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">💡</div>
        <div>
          <strong>Think of it this way:</strong> If you were hiring five specialists for an
          offshore oil platform, you wouldn't give the procurement officer access to the
          drilling console, or let the field technician approve purchase orders. Each role
          has a <em>scope</em> — and so should each agent.
        </div>
      </div>

      {/* ── Clickable Agent Selector ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">SELECT AN AGENT TO EXPLORE</span>
        <div className="divider-line" />
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
        {agents.map((a) => (
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
          </button>
        ))}
      </div>

      {/* ── Expanded Agent Detail ── */}
      {selectedAgent && (
        <div
          className="card agent-detail-card"
          style={{
            marginTop: 20,
            "--agent-color": selectedAgent.color,
            borderColor: selectedAgent.color + "40",
          } as React.CSSProperties}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, fontSize: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: selectedAgent.color + "18",
            }}>
              {selectedAgent.avatar}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{selectedAgent.name}</div>
              <div style={{ fontSize: 14, color: "var(--text-dim)" }}>{selectedAgent.title}</div>
            </div>
            <span
              className="badge"
              style={{
                marginLeft: "auto",
                background: selectedAgent.risk_level === "critical" ? "rgba(239,68,68,0.15)"
                  : selectedAgent.risk_level === "high" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                color: selectedAgent.risk_level === "critical" ? "var(--red)"
                  : selectedAgent.risk_level === "high" ? "var(--yellow)" : "var(--green)",
                fontSize: 12, padding: "4px 14px",
              }}
            >
              {selectedAgent.risk_level} risk
            </span>
          </div>

          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 20 }}>
            {selectedAgent.mission}
          </p>

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
              <strong>Required Certification:</strong> {selectedAgent.certification} &nbsp;|&nbsp;
              <strong>UC Grants:</strong> {selectedAgent.uc_grants.length} rules applied
            </span>
          </div>
        </div>
      )}

      {/* ── Transition: What they share ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">ALL FIVE AGENT PROFILES</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        Below are the full employee badges for all five agents. Notice the pattern:
        every agent has <strong>explicit reads, explicit writes, and explicit denials</strong>.
        Nothing is implicit. Nothing is inherited. This is the principle of least privilege — applied to machines.
      </p>

      {/* ── Full Agent Cards Grid ── */}
      <div className="team-grid">
        {agents.map((a) => (
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
              <span
                className="badge"
                style={{
                  marginLeft: "auto",
                  background: a.risk_level === "critical" ? "rgba(239,68,68,0.15)"
                    : a.risk_level === "high" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                  color: a.risk_level === "critical" ? "var(--red)"
                    : a.risk_level === "high" ? "var(--yellow)" : "var(--green)",
                }}
              >
                {a.risk_level} risk
              </span>
            </div>

            <p className="agent-mission">{a.mission}</p>

            <div className="access-section">
              <div className="access-label">Reads</div>
              <div className="access-tags">
                {a.reads.map((r) => (
                  <span key={r} className="tag tag-read">SELECT {r}</span>
                ))}
              </div>
            </div>

            <div className="access-section" style={{ marginTop: 10 }}>
              <div className="access-label">Writes</div>
              <div className="access-tags">
                {a.writes.map((w) => (
                  <span key={w} className="tag tag-write">INSERT {w}</span>
                ))}
              </div>
            </div>

            <div className="access-section" style={{ marginTop: 10 }}>
              <div className="access-label">Denied</div>
              <div className="access-tags">
                {a.denied.map((d) => (
                  <span key={d} className="tag tag-denied">{d}</span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-dim)" }}>
              <strong>Certification:</strong> {a.certification}
            </div>
          </div>
        ))}
      </div>

      {/* ── Transition: What comes next ── */}
      <div className="callout-box" style={{ marginTop: 48 }}>
        <div className="callout-icon">📋</div>
        <div>
          <strong>Now that you've met the team</strong>, let's see how they actually get
          onboarded. Each agent goes through the same 3-step process: Identity, Access, and
          Audit — no shortcuts, no exceptions.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <button className="btn btn-primary" onClick={() => nav("/onboarding")}>
          See the Onboarding Process →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/governance")}>
          Jump to Governance Matrix
        </button>
      </div>
    </div>
  );
}
