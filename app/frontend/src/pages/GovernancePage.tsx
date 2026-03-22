import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Agent {
  id: string;
  name: string;
  avatar: string;
  color: string;
  uc_grants: string[];
  denied: string[];
}

const DATA_ASSETS = [
  "sensor_telemetry",
  "rul_predictions",
  "sap_work_orders",
  "sap_inventory",
  "crew_roster",
  "drilling_ops",
  "cost_data",
];

function hasAccess(grants: string[], denied: string[], asset: string): "grant" | "deny" {
  const combined = grants.join(" ").toLowerCase() + " " + denied.join(" ").toLowerCase();
  const key = asset.replace(/_/g, "").toLowerCase();
  for (const d of denied) {
    if (d.replace(/_/g, "").toLowerCase().includes(key)) return "deny";
  }
  for (const g of grants) {
    if (g.replace(/_/g, "").toLowerCase().includes(key)) return "grant";
  }
  if (asset === "sensor_telemetry" && combined.includes("telemetry")) return "grant";
  if (asset === "drilling_ops" && combined.includes("drilling")) return "grant";
  return "deny";
}

export default function GovernancePage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then(setAgents);
  }, []);

  // Count stats
  const totalCells = agents.length * DATA_ASSETS.length;
  let grantCount = 0;
  let denyCount = 0;
  agents.forEach((a) => {
    DATA_ASSETS.forEach((asset) => {
      if (hasAccess(a.uc_grants, a.denied, asset) === "grant") grantCount++;
      else denyCount++;
    });
  });

  return (
    <div className="page">
      <h1 className="page-title">Governance Matrix</h1>
      <p className="page-subtitle">
        Role-based access at a glance. Green means granted, red means denied.
        Every cell is a Unity Catalog GRANT or absence thereof.
      </p>

      {/* ── Context: Reading the Matrix ── */}
      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">📖</div>
        <div>
          <strong>How to read this:</strong> Each row is an agent. Each column is a data asset.
          A green cell means Unity Catalog has an active GRANT for that combination. A red cell
          means the agent has <em>no permission</em> — any query attempt will be blocked and logged.
          This is the principle of least privilege in action.
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 24 }}>
        {[
          { label: "Agents", value: agents.length, color: "var(--accent)" },
          { label: "Data Assets", value: DATA_ASSETS.length, color: "var(--blue)" },
          { label: "Grants", value: grantCount, color: "var(--green)" },
          { label: "Denials", value: denyCount, color: "var(--red)" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <p className="interstitial-text" style={{ marginTop: 24 }}>
        Notice the pattern: <strong>more red than green</strong>. That's by design. In a
        well-governed system, agents should be denied more than they're granted. The
        {" "}<strong>{Math.round((denyCount / (totalCells || 1)) * 100)}%</strong> denial rate means
        each agent only touches the data it absolutely needs.
      </p>

      {/* ── The Matrix ── */}
      <div className="divider-section" style={{ marginTop: 32 }}>
        <div className="divider-line" />
        <span className="divider-label">ACCESS CONTROL MATRIX</span>
        <div className="divider-line" />
      </div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Agent</th>
              {DATA_ASSETS.map((a) => (
                <th key={a} style={{ fontSize: 11 }}>{a.replace(/_/g, " ")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td className="cell-agent">
                  <span style={{ marginRight: 8 }}>{agent.avatar}</span>
                  {agent.name}
                </td>
                {DATA_ASSETS.map((asset) => {
                  const access = hasAccess(agent.uc_grants, agent.denied, asset);
                  const cellId = `${agent.id}-${asset}`;
                  return (
                    <td
                      key={asset}
                      className={access === "grant" ? "cell-grant" : "cell-deny"}
                      onMouseEnter={() => setHoveredCell(cellId)}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{
                        cursor: "default",
                        background: hoveredCell === cellId
                          ? access === "grant" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.08)"
                          : undefined,
                      }}
                    >
                      {access === "grant" ? "✓ GRANT" : "✕ DENY"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Scenario: What denial looks like ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">SCENARIO: UNAUTHORIZED ACCESS</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        What happens when the HEALTH agent — whose job is monitoring sensor telemetry —
        tries to access crew roster data? Unity Catalog doesn't just fail silently.
        It <strong>blocks the query, logs the attempt, and attributes it</strong> to the
        specific service principal.
      </p>

      <div className="denied-card">
        <h3>🚫 What Denial Looks Like</h3>
        <p style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 16, lineHeight: 1.5 }}>
          The HEALTH agent attempts to read crew data it doesn't have permission for.
          Unity Catalog blocks the query and creates an immutable audit record.
        </p>
        <pre>{`-- HEALTH agent attempts unauthorized access
SELECT * FROM ops.gold.crew_roster;

Error: PERMISSION_DENIED
  Principal 'agent-health-monitor' does not have SELECT
  on table 'ops.gold.crew_roster'.

-- This attempt is logged in system.access.audit:
-- {
--   "event_time": "2024-03-15T14:23:01Z",
--   "service_principal": "agent-health-monitor",
--   "action_name": "commandSubmit",
--   "response": { "statusCode": "PERMISSION_DENIED" },
--   "request_params": { "commandText": "SELECT * FROM ..." }
-- }`}</pre>
      </div>

      {/* ── Transition to column/row level ── */}
      <div className="callout-box" style={{ marginTop: 32, background: "rgba(139,92,246,0.06)", borderColor: "rgba(139,92,246,0.2)" }}>
        <div className="callout-icon">🔬</div>
        <div>
          <strong>It goes deeper than table-level.</strong> Column masking means the CREW agent
          can query <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>crew_assignments</code> but
          the <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>hourly_rate</code> column
          returns NULL. Row filters mean the DRILLING agent only sees active operations — historical
          data is invisible. Same table, different views, based on who's asking.
        </div>
      </div>

      {/* ── Why This Matters ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">WHY THIS MATTERS</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        Governance isn't a tax on innovation — it's the foundation that makes AI agents
        trustworthy enough to deploy in production. Here are the four principles that
        Unity Catalog enforces for every agent, every query, every time.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {[
          {
            icon: "🎯",
            title: "Least Privilege",
            text: "Each agent sees only the data it needs. The SUPPLY CHAIN agent never sees crew schedules. The CREW agent never sees cost data. The attack surface shrinks with every DENY.",
          },
          {
            icon: "🔍",
            title: "Full Auditability",
            text: "Every query, every access, every denial is logged in immutable system tables. When an agent makes a recommendation, you can trace exactly which data rows informed that decision.",
          },
          {
            icon: "🛡️",
            title: "Blast Radius Control",
            text: "If an agent is compromised or hallucinates, the damage is contained. A rogue HEALTH agent can't delete work orders or reassign crew — it simply doesn't have the grants.",
          },
          {
            icon: "🔄",
            title: "Same Model, New Users",
            text: "You don't need a new governance framework for AI. Unity Catalog applies the same identity → access → audit pattern to agents as it does to humans. One platform, all users.",
          },
        ].map((c) => (
          <div key={c.title} className="card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{c.title}</h4>
            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{c.text}</p>
          </div>
        ))}
      </div>

      {/* ── Next page ── */}
      <div className="callout-box" style={{ marginTop: 48 }}>
        <div className="callout-icon">🏗️</div>
        <div>
          <strong>See the full picture.</strong> The Architecture page shows how data flows from
          sources through the medallion lakehouse, through Unity Catalog governance, to each
          agent — and how outputs flow back.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <button className="btn btn-primary" onClick={() => nav("/architecture")}>
          View the Architecture →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/team")}>
          ← Back to the Team
        </button>
      </div>
    </div>
  );
}
