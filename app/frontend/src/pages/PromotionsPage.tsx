import { useNavigate } from "react-router-dom";

export default function PromotionsPage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Stage 5: Promotions & Growth</h1>
      <p className="page-subtitle">
        High-performing agents earn broader access, more powerful tools, and bigger
        responsibilities. Agents can also make lateral moves to new departments — all
        logged, reversible, and auditable.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🚀</div>
        <div>
          <strong>The HR analogy:</strong> Promotions mean more responsibility, higher comp, and
          access to more sensitive projects. Lateral moves let employees switch teams without
          losing their history. For agents, "rewards" are: broader data access, more advanced
          UC functions, larger compute budgets, and expanded user scope.
        </div>
      </div>

      {/* ── Promotion Mechanics ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">WHAT A PROMOTION LOOKS LIKE</span>
        <div className="divider-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: 0, alignItems: "stretch", maxWidth: 800, margin: "16px auto" }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-dim)", marginBottom: 12 }}>BEFORE (Current Level)</div>
          {[
            "SELECT on sensors.bronze.telemetry",
            "SELECT on ref.failure_patterns",
            "INSERT on hr.agent_interactions",
            "EXECUTE on ml.tools.detect_anomaly",
            "Cluster policy: medium_compute",
            "Serves: operations team only",
          ].map((g) => (
            <div key={g} className="grant-line current">{g}</div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 24, color: "var(--accent)" }}>→</span>
        </div>
        <div className="card" style={{ padding: 20, borderColor: "rgba(16,185,129,0.3)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green)", marginBottom: 12 }}>AFTER (Promoted)</div>
          {[
            "SELECT on sensors.bronze.telemetry",
            "SELECT on ref.failure_patterns",
            "INSERT on hr.agent_interactions",
            "EXECUTE on ml.tools.detect_anomaly",
            "✨ SELECT on analytics.silver.enriched_telemetry",
            "✨ EXECUTE on ml.tools.predict_rul",
            "✨ INSERT on ops.gold.recommendations",
            "✨ Cluster policy: large_compute",
            "✨ Serves: operations + maintenance teams",
          ].map((g) => (
            <div key={g} className={`grant-line ${g.startsWith("✨") ? "new" : "current"}`}>{g}</div>
          ))}
        </div>
      </div>

      <div className="code-block" style={{ marginTop: 24 }}>
        <span className="cm">-- Promotion: expand HEALTH agent access</span><br /><br />
        <span className="cm">-- 1. Grant new table access</span><br />
        <span className="kw">GRANT</span> <span className="fn">SELECT</span> <span className="kw">ON TABLE</span> analytics.silver.enriched_telemetry<br />
        &nbsp;&nbsp;<span className="kw">TO</span> <span className="str">`agent-health-monitor`</span>;<br /><br />
        <span className="cm">-- 2. Grant new tool access (UC functions)</span><br />
        <span className="kw">GRANT</span> <span className="fn">EXECUTE</span> <span className="kw">ON FUNCTION</span> ml.tools.predict_rul<br />
        &nbsp;&nbsp;<span className="kw">TO</span> <span className="str">`agent-health-monitor`</span>;<br /><br />
        <span className="cm">-- 3. Grant write access to recommendations</span><br />
        <span className="kw">GRANT</span> <span className="fn">INSERT</span> <span className="kw">ON TABLE</span> ops.gold.recommendations<br />
        &nbsp;&nbsp;<span className="kw">TO</span> <span className="str">`agent-health-monitor`</span>;<br /><br />
        <span className="cm">-- 4. Upgrade compute policy</span><br />
        <span className="cm">-- (via Databricks cluster policy API)</span><br /><br />
        <span className="cm">-- 5. Log the lifecycle event</span><br />
        <span className="kw">INSERT INTO</span> hr.agent_lifecycle_events <span className="kw">VALUES</span> (<br />
        &nbsp;&nbsp;<span className="fn">uuid</span>(), <span className="str">'agent_001'</span>, <span className="str">'promoted'</span>,<br />
        &nbsp;&nbsp;<span className="str">'production_L1'</span>, <span className="str">'production_L2'</span>,<br />
        &nbsp;&nbsp;<span className="kw">NULL</span>, <span className="kw">NULL</span>,<br />
        &nbsp;&nbsp;<span className="str">'3 consecutive reviews above 95% accuracy'</span>,<br />
        &nbsp;&nbsp;<span className="fn">ARRAY</span>(<span className="str">'SELECT on enriched_telemetry'</span>, <span className="str">'EXECUTE on predict_rul'</span>),<br />
        &nbsp;&nbsp;<span className="str">'v3.2.1'</span>, <span className="str">'ops_manager@company.com'</span>,<br />
        &nbsp;&nbsp;<span className="kw">true</span>, <span className="fn">current_timestamp</span>()<br />
        );
      </div>

      {/* ── Lateral Moves ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">LATERAL MOVES</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        An agent can switch "departments" without losing its history. For example, the
        SUPPLY CHAIN agent could move to the QA team — its role template, datasets, and
        toolset change, but all historical performance data and models remain linked.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {[
          {
            icon: "🔄", title: "Role Template Swap",
            text: "Update the agent's role_id in hr.agents to the new department's template. Old template stays in history.",
          },
          {
            icon: "🔑", title: "Grant Rotation",
            text: "Revoke old department grants, apply new department grants. All changes logged in hr.agent_lifecycle_events.",
          },
          {
            icon: "🧠", title: "Model Continuity",
            text: "Historical models and experiments stay under the original MLflow path. New training starts under the new capability namespace.",
          },
          {
            icon: "📋", title: "Full Audit Trail",
            text: "The lateral move is logged with from_role, to_role, grants_changed, and reason. Fully reversible if the move doesn't work out.",
          },
        ].map((c) => (
          <div key={c.title} className="card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{c.title}</h4>
            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{c.text}</p>
          </div>
        ))}
      </div>

      {/* ── Lifecycle Events Table ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">THE HR CHANGE LOG</span>
        <div className="divider-line" />
      </div>

      <div className="schema-card">
        <h3>hr.agent_lifecycle_events</h3>
        <p>Every transition — promotions, lateral moves, coaching, freezes — is an immutable record</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["event_id", "STRING", "Unique event ID"],
              ["agent_id", "STRING", "FK to agents"],
              ["event_type", "STRING", "hired | promoted | lateral_move | coached | frozen | retired | rehired"],
              ["from_stage", "STRING", "Previous lifecycle stage"],
              ["to_stage", "STRING", "New lifecycle stage"],
              ["from_role", "STRING", "Previous role (for lateral moves)"],
              ["to_role", "STRING", "New role (for lateral moves)"],
              ["reason", "STRING", "Business justification"],
              ["grants_changed", "ARRAY<STRING>", "UC grants added or removed"],
              ["model_version_change", "STRING", "Model version transition"],
              ["approved_by", "STRING", "Human approver"],
              ["is_reversible", "BOOLEAN", "Can this be rolled back?"],
              ["event_time", "TIMESTAMP", "When it happened"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="callout-box" style={{ marginTop: 32, background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}>
        <div className="callout-icon">🔐</div>
        <div>
          <strong>Key principle:</strong> Every change is logged, reversible, and auditable.
          If a promotion causes unexpected behavior, you can query{" "}
          <code className="inline-code">hr.agent_lifecycle_events</code> to see exactly what
          grants were added, roll them back, and revert the agent to its previous level — all
          through Unity Catalog lineage and access logs.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/offboarding")}>
          Next: Offboarding & Retirement →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/performance")}>
          ← Back to Reviews
        </button>
      </div>
    </div>
  );
}
