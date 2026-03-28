import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Stage 2: Onboarding</h1>
      <p className="page-subtitle">
        Every agent follows a structured onboarding flow — orientation, sandbox access,
        and a probation period with stricter guardrails. No shortcuts, no exceptions.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🏢</div>
        <div>
          <strong>The HR analogy:</strong> New employees don't get admin access on Day 1. They get
          orientation, a limited sandbox, and a probation period where their manager reviews their
          work more closely. Agent onboarding works the same way.
        </div>
      </div>

      {/* ── Onboarding Checklist ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">THE ONBOARDING CHECKLIST</span>
        <div className="divider-line" />
      </div>

      <div className="onboarding-checklist">
        {[
          {
            step: "1", title: "Identity Verification",
            desc: "Service principal created, added to department group, linked to requisition record",
            sql: "-- Verified: SP exists in Unity Catalog\nSELECT * FROM system.access.service_principals\nWHERE display_name = 'agent-health-monitor';",
            uc: "Service Principal → Group membership → Requisition FK",
          },
          {
            step: "2", title: "Sandbox Assignment",
            desc: "Agent gets read-only access to a sandbox schema with sample data — NOT production tables",
            sql: "-- Sandbox grants: read sample data only\nGRANT SELECT ON SCHEMA sandbox.bop_samples\n  TO `agent-health-monitor`;\n\n-- Production access is DENIED during onboarding\nDENY SELECT ON SCHEMA sensors.bronze\n  TO `agent-health-monitor`;",
            uc: "GRANT on sandbox schema → DENY on production schemas",
          },
          {
            step: "3", title: "Model Access (Staging Only)",
            desc: "Agent can only call Staging versions of models in MLflow — not Production models",
            sql: "-- MLflow Registry: agent can only load Staging models\n-- Enforced via UC function permissions\nGRANT EXECUTE ON FUNCTION ml.tools.detect_anomaly_staging\n  TO `agent-health-monitor`;\n\n-- Production version is off-limits\nDENY EXECUTE ON FUNCTION ml.tools.detect_anomaly_prod\n  TO `agent-health-monitor`;",
            uc: "EXECUTE on staging functions → DENY on production functions",
          },
          {
            step: "4", title: "Compute Assignment",
            desc: "Agent is assigned to a restrictive cluster policy — small instance, auto-terminate, no spot override",
            sql: "-- Cluster policy: onboarding_agents\n-- Max workers: 2, auto-terminate: 30min\n-- Instance type: locked to i3.xlarge\n-- No access to GPU clusters",
            uc: "Cluster policy → onboarding_agents (restrictive)",
          },
          {
            step: "5", title: "Probation Mode Activated",
            desc: "Agent actions require human approval for the first 30 days. Every output goes through a review queue.",
            sql: "-- Probation config in agent registry\nUPDATE hr.agents\nSET lifecycle_stage = 'probation',\n    probation_end_date = current_date() + INTERVAL 30 DAYS\nWHERE agent_id = 'agent_001';",
            uc: "lifecycle_stage = 'probation' → human-in-the-loop required",
          },
        ].map((item) => (
          <div key={item.step} className="checklist-item">
            <div className="checklist-marker">
              <div className="checklist-num">{item.step}</div>
            </div>
            <div className="checklist-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="code-block" style={{ marginTop: 12 }}>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{item.sql}</pre>
              </div>
              <div className="uc-badge">
                <span className="uc-icon">🔐</span> {item.uc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Onboarding Events Table ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">TRACKING THE ONBOARDING</span>
        <div className="divider-line" />
      </div>

      <div className="schema-card">
        <h3>hr.agent_onboarding_events</h3>
        <p>Every onboarding step is logged as an event — the digital orientation checklist</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["event_id", "STRING", "Unique event ID"],
              ["agent_id", "STRING", "FK to agents"],
              ["event_type", "STRING", "sp_created | grants_applied | sandbox_assigned | probation_started | probation_passed"],
              ["event_data", "MAP<STRING,STRING>", "Event-specific metadata (grants applied, sandbox schema, etc.)"],
              ["completed_by", "STRING", "Provisioning Job or human approver"],
              ["event_time", "TIMESTAMP", "When event occurred"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Probation Deep Dive ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">PROBATION MODE: HOW IT WORKS</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        During probation, the agent operates under <strong>stricter guardrails</strong>. Think of it
        as a new hire's first 90 days — closer supervision, smaller scope, and more frequent check-ins.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {[
          {
            icon: "🔍", title: "Human-in-the-Loop",
            text: "Every recommendation the agent generates goes to a review queue. A human approves or rejects before it takes effect. This builds trust and catches early errors.",
          },
          {
            icon: "📏", title: "Smaller Data Scope",
            text: "Sandbox data only — no production tables. The agent trains on representative samples, not live sensor feeds. Production access unlocks after probation passes.",
          },
          {
            icon: "⏱️", title: "Tighter Rate Limits",
            text: "During probation, agents are rate-limited to 100 actions/hour (vs. 10,000 in production). This prevents runaway costs and limits blast radius.",
          },
          {
            icon: "📊", title: "Daily Review Cadence",
            text: "A scheduled Job runs daily to evaluate probation agents: accuracy vs. baseline, error rate, latency. If metrics drop below thresholds, probation is extended.",
          },
        ].map((c) => (
          <div key={c.title} className="card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{c.title}</h4>
            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{c.text}</p>
          </div>
        ))}
      </div>

      {/* ── What triggers next stage ── */}
      <div className="callout-box" style={{ marginTop: 32, background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}>
        <div className="callout-icon">✅</div>
        <div>
          <strong>What moves the agent forward:</strong> After 30 days (or a custom probation period),
          a scheduled evaluation Job checks: accuracy {">"} 85%, zero policy violations, and manager sign-off.
          If all pass, the agent transitions to <strong>Training & Development</strong> with expanded access.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/training")}>
          Next: Training & Development →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/hiring")}>
          ← Back to Hiring
        </button>
      </div>
    </div>
  );
}
