import { useNavigate } from "react-router-dom";

export default function OffboardingPage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Stage 6: Offboarding & Retirement</h1>
      <p className="page-subtitle">
        When an agent reaches end-of-life, it gets a formal retirement: access revoked,
        models archived, jobs stopped — but all history preserved for audit and potential rehire.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">📦</div>
        <div>
          <strong>The HR analogy:</strong> When an employee leaves, you don't delete their email
          history or shred their performance reviews. You revoke access, deactivate accounts,
          and retain records for compliance. Agent offboarding follows the same principle:
          disable, don't destroy.
        </div>
      </div>

      {/* ── Offboarding Playbook ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">THE OFFBOARDING PLAYBOOK</span>
        <div className="divider-line" />
      </div>

      <div className="offboarding-steps">
        {[
          {
            step: "1", title: "Revoke All Access",
            desc: "Remove all Unity Catalog grants. The agent can no longer query any table, execute any function, or write any data.",
            sql: "-- Revoke all grants for the retiring agent\nREVOKE ALL PRIVILEGES ON SCHEMA sensors.bronze\n  FROM `agent-drilling-ops`;\nREVOKE ALL PRIVILEGES ON SCHEMA ops.gold\n  FROM `agent-drilling-ops`;\nREVOKE ALL PRIVILEGES ON SCHEMA analytics.silver\n  FROM `agent-drilling-ops`;\n\n-- Remove from all groups\nALTER GROUP 'drilling_agents'\n  DROP SERVICE PRINCIPAL 'agent-drilling-ops';",
            icon: "🔒",
          },
          {
            step: "2", title: "Disable Service Principal",
            desc: "Deactivate (don't delete) the service principal. The identity remains for audit purposes but can no longer authenticate.",
            sql: "-- Disable the service principal\nALTER SERVICE PRINCIPAL 'agent-drilling-ops'\n  SET ACTIVE = false\n  COMMENT 'Retired 2024-12-01: consistently underperforming';",
            icon: "🚫",
          },
          {
            step: "3", title: "Stop All Jobs & Apps",
            desc: "Cancel any active runs and disable all scheduled Jobs and Apps associated with the agent.",
            sql: "-- Via Databricks Jobs API / CLI\n# databricks jobs update --job-id 12345 \\\n#   --json '{\"settings\": {\"schedule\": null}}'\n\n-- Log the shutdown\nINSERT INTO hr.agent_lifecycle_events VALUES (\n  uuid(), 'agent_005', 'retired',\n  'production', 'archived',\n  NULL, NULL,\n  'Consistently below 70% accuracy for 3 review cycles',\n  ARRAY('ALL PRIVILEGES revoked'),\n  'v1.0.0 → Archived',\n  'ops_manager@company.com',\n  true, current_timestamp()\n);",
            icon: "⏹️",
          },
          {
            step: "4", title: "Archive Models",
            desc: "Move all model versions to 'Archived' stage in MLflow Registry. Tag with retirement reason and date.",
            sql: "# Archive all model versions\nclient.transition_model_version_stage(\n  name='agents.drilling.risk_assessment',\n  version='3',\n  stage='Archived'\n)\n\n# Tag with retirement metadata\nclient.set_model_version_tag(\n  name='agents.drilling.risk_assessment',\n  version='3',\n  key='retirement_reason',\n  value='Below performance threshold for 3 cycles'\n)\nclient.set_model_version_tag(\n  name='agents.drilling.risk_assessment',\n  version='3',\n  key='retired_date',\n  value='2024-12-01'\n)",
            icon: "📁",
          },
          {
            step: "5", title: "Preserve All History",
            desc: "Logs, interactions, feedback, performance snapshots, and lineage remain permanently. Nothing is deleted.",
            sql: "-- All historical data stays in Delta tables:\n-- hr.agent_interactions  → every action taken\n-- hr.agent_feedback      → every human review\n-- hr.agent_performance_snapshots → every evaluation\n-- hr.agent_lifecycle_events → every transition\n-- system.access.audit    → every UC event\n-- system.access.table_lineage → every data flow\n\n-- Update agent registry\nUPDATE hr.agents\nSET is_active = false,\n    lifecycle_stage = 'archived',\n    retirement_date = current_date()\nWHERE agent_id = 'agent_005';",
            icon: "🗄️",
          },
        ].map((item) => (
          <div key={item.step} className="offboarding-item">
            <div className="offboarding-marker">
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <span className="offboarding-num">Step {item.step}</span>
            </div>
            <div className="offboarding-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="code-block" style={{ marginTop: 12 }}>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{item.sql}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Querying Historical Impact ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">QUERYING HISTORICAL IMPACT</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        Even after retirement, you can answer any question about the agent's lifetime impact.
      </p>

      <div className="code-block">
        <span className="cm">-- What tables and users did this agent affect in its lifetime?</span><br />
        <span className="kw">SELECT</span><br />
        &nbsp;&nbsp;a.agent_name,<br />
        &nbsp;&nbsp;a.hire_date,<br />
        &nbsp;&nbsp;a.retirement_date,<br />
        &nbsp;&nbsp;<span className="fn">count</span>(<span className="kw">DISTINCT</span> i.interaction_id) <span className="kw">AS</span> total_actions,<br />
        &nbsp;&nbsp;<span className="fn">count</span>(<span className="kw">DISTINCT</span> i.user_id) <span className="kw">AS</span> users_served,<br />
        &nbsp;&nbsp;<span className="fn">collect_set</span>(i.tables_accessed) <span className="kw">AS</span> all_tables_touched,<br />
        &nbsp;&nbsp;<span className="fn">avg</span>(p.accuracy_score) <span className="kw">AS</span> lifetime_avg_accuracy,<br />
        &nbsp;&nbsp;<span className="fn">sum</span>(p.violation_count) <span className="kw">AS</span> lifetime_violations<br />
        <span className="kw">FROM</span> hr.agents a<br />
        <span className="kw">LEFT JOIN</span> hr.agent_interactions i <span className="kw">ON</span> a.agent_id = i.agent_id<br />
        <span className="kw">LEFT JOIN</span> hr.agent_performance_snapshots p <span className="kw">ON</span> a.agent_id = p.agent_id<br />
        <span className="kw">WHERE</span> a.agent_id = <span className="str">'agent_005'</span><br />
        <span className="kw">GROUP BY</span> 1, 2, 3;
      </div>

      {/* ── Rehire Flow ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">THE REHIRE FLOW</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        Need to bring an agent back? The rehire flow reintroduces an archived identity
        with updated role templates, using its historical models and performance data
        as a starting point — not from scratch.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {[
          {
            icon: "🔄", title: "Reactivate Identity",
            text: "Re-enable the service principal. The original identity is preserved — same audit trail, same lineage connections.",
          },
          {
            icon: "📋", title: "New Role Template",
            text: "Assign a new (or updated) role template. The agent doesn't automatically get its old permissions — it goes through a new approval cycle.",
          },
          {
            icon: "🧠", title: "Leverage History",
            text: "Archived models and training data are available as starting points. The retraining pipeline can warm-start from the last known good model version.",
          },
          {
            icon: "🪪", title: "Probation (Again)",
            text: "Rehired agents go through probation just like new hires. Trust is re-earned, not assumed. The historical performance data provides context but not automatic clearance.",
          },
        ].map((c) => (
          <div key={c.title} className="card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{c.title}</h4>
            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{c.text}</p>
          </div>
        ))}
      </div>

      <div className="callout-box" style={{ marginTop: 32, background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}>
        <div className="callout-icon">🎯</div>
        <div>
          <strong>The full circle:</strong> From hiring to retirement to rehire, every stage is
          governed by the same primitives — Unity Catalog for access, MLflow for models, Delta
          for audit trails, and Jobs for automation. The lifecycle is complete, auditable, and
          repeatable.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/risk")}>
          Next: Risk & Compliance →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/promotions")}>
          ← Back to Growth
        </button>
      </div>
    </div>
  );
}
