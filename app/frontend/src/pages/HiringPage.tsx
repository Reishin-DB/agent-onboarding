import { useNavigate } from "react-router-dom";

export default function HiringPage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Stage 1: Attract & Hire</h1>
      <p className="page-subtitle">
        Before an agent touches a single row of data, it goes through a formal
        requisition and approval process — just like opening a headcount.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🏢</div>
        <div>
          <strong>The HR analogy:</strong> You wouldn't hire a human without a job description,
          an approval from management, and a background check. Agent "hiring" means defining
          the role template, getting approval, and provisioning a governed identity.
        </div>
      </div>

      {/* ── Step 1: Role Templates ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">STEP 1: DEFINE THE JOB DESCRIPTION</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        Every agent role starts as a <strong>template</strong> — a job description that specifies
        what data domains the agent can access, which tools it can use, its risk level, and who
        must approve it.
      </p>

      <div className="schema-card">
        <h3>hr.agent_role_templates</h3>
        <p>Defines available agent roles — like job descriptions for AI</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["role_id", "STRING", "Unique role identifier"],
              ["role_name", "STRING", "e.g., 'BOP Health Monitor'"],
              ["department", "STRING", "Owning business unit"],
              ["risk_level", "STRING", "low | medium | high | critical"],
              ["required_certification", "STRING", "Must pass before production"],
              ["allowed_tools", "ARRAY<STRING>", "UC functions this role can invoke"],
              ["data_domains", "ARRAY<STRING>", "Catalogs/schemas accessible"],
              ["max_compute_tier", "STRING", "Cluster policy limit"],
              ["approval_chain", "ARRAY<STRING>", "Required approvers"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="code-block" style={{ marginTop: 16 }}>
        <span className="cm">-- Define a new agent role template</span><br />
        <span className="kw">INSERT INTO</span> hr.agent_role_templates <span className="kw">VALUES</span> (<br />
        &nbsp;&nbsp;<span className="str">'role_health_monitor'</span>,<br />
        &nbsp;&nbsp;<span className="str">'BOP Health Monitor'</span>,<br />
        &nbsp;&nbsp;<span className="str">'operations'</span>,<br />
        &nbsp;&nbsp;<span className="str">'high'</span>,<br />
        &nbsp;&nbsp;<span className="str">'BOP_MAINT_LEVEL_II'</span>,<br />
        &nbsp;&nbsp;<span className="fn">ARRAY</span>(<span className="str">'detect_anomaly'</span>, <span className="str">'score_component'</span>),<br />
        &nbsp;&nbsp;<span className="fn">ARRAY</span>(<span className="str">'sensors.bronze'</span>, <span className="str">'ref'</span>),<br />
        &nbsp;&nbsp;<span className="str">'medium_compute'</span>,<br />
        &nbsp;&nbsp;<span className="fn">ARRAY</span>(<span className="str">'ops_manager'</span>, <span className="str">'data_governance_lead'</span>)<br />
        );
      </div>

      {/* ── Step 2: Requisition ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">STEP 2: OPEN A REQUISITION</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        A human manager submits a <strong>requisition</strong> to create a new agent. The req
        includes business justification, scope, and the role template. It must be approved
        by everyone in the approval chain before provisioning begins.
      </p>

      <div className="schema-card">
        <h3>hr.agent_requisitions</h3>
        <p>Tracks requests to create new agents — like job requisitions</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["requisition_id", "STRING", "Unique req ID"],
              ["role_id", "STRING", "FK to role_templates"],
              ["requested_by", "STRING", "Human requestor"],
              ["business_justification", "STRING", "Why this agent is needed"],
              ["scope_description", "STRING", "What the agent will do"],
              ["status", "STRING", "pending → approved → provisioned"],
              ["approved_by", "STRING", "Approver identity"],
              ["service_principal_id", "STRING", "Created SP (after approval)"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Step 3: Provisioning ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">STEP 3: PROVISION THE AGENT</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        Once approved, a <strong>Databricks Job</strong> automatically provisions the agent:
        creates its service principal, adds it to the right groups, applies base UC grants,
        and registers it in the agent directory.
      </p>

      <div className="code-block">
        <span className="cm">-- Provisioning Job (runs on approval)</span><br /><br />
        <span className="cm">-- 1. Create the service principal (identity)</span><br />
        <span className="kw">CREATE</span> <span className="fn">SERVICE PRINCIPAL</span> <span className="str">'agent-health-monitor'</span><br />
        &nbsp;&nbsp;<span className="kw">COMMENT</span> <span className="str">'BOP Health monitoring agent — reads sensor telemetry'</span>;<br /><br />
        <span className="cm">-- 2. Add to department group</span><br />
        <span className="kw">ALTER GROUP</span> <span className="str">'operations_agents'</span><br />
        &nbsp;&nbsp;<span className="kw">ADD</span> <span className="fn">SERVICE PRINCIPAL</span> <span className="str">'agent-health-monitor'</span>;<br /><br />
        <span className="cm">-- 3. Apply starter grants (read-only, scoped)</span><br />
        <span className="kw">GRANT</span> <span className="fn">SELECT</span> <span className="kw">ON TABLE</span> sensors.bronze.telemetry<br />
        &nbsp;&nbsp;<span className="kw">TO</span> <span className="str">`agent-health-monitor`</span>;<br />
        <span className="kw">GRANT</span> <span className="fn">SELECT</span> <span className="kw">ON TABLE</span> ref.failure_patterns<br />
        &nbsp;&nbsp;<span className="kw">TO</span> <span className="str">`agent-health-monitor`</span>;<br /><br />
        <span className="cm">-- 4. Grant write access ONLY to its own log table</span><br />
        <span className="kw">GRANT</span> <span className="fn">INSERT</span> <span className="kw">ON TABLE</span> hr.agent_interactions<br />
        &nbsp;&nbsp;<span className="kw">TO</span> <span className="str">`agent-health-monitor`</span>;<br /><br />
        <span className="cm">-- 5. Register in the agent directory</span><br />
        <span className="kw">INSERT INTO</span> hr.agents <span className="kw">VALUES</span> (<br />
        &nbsp;&nbsp;<span className="str">'agent_001'</span>, <span className="str">'HEALTH'</span>, <span className="str">'sp-health-monitor'</span>,<br />
        &nbsp;&nbsp;<span className="str">'role_health_monitor'</span>, <span className="str">'operations'</span>,<br />
        &nbsp;&nbsp;<span className="str">'probation'</span>, <span className="fn">current_date</span>(), ...<br />
        );
      </div>

      <div className="schema-card" style={{ marginTop: 24 }}>
        <h3>hr.agents</h3>
        <p>Master agent registry — the employee directory for AI</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["agent_id", "STRING", "Unique agent identifier"],
              ["agent_name", "STRING", "Human-readable name"],
              ["service_principal_id", "STRING", "UC service principal"],
              ["role_id", "STRING", "FK to role_templates"],
              ["lifecycle_stage", "STRING", "probation | training | production | coaching | archived"],
              ["hire_date", "DATE", "When the agent was provisioned"],
              ["current_model_version", "STRING", "Active model in MLflow"],
              ["model_stage", "STRING", "Staging | Production | Archived"],
              ["manager_principal", "STRING", "Human owner / manager"],
              ["is_active", "BOOLEAN", "Whether agent is currently active"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── What triggers next stage ── */}
      <div className="callout-box" style={{ marginTop: 32, background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}>
        <div className="callout-icon">✅</div>
        <div>
          <strong>What moves the agent forward:</strong> Once the provisioning Job completes
          successfully and writes to <code className="inline-code">hr.agent_onboarding_events</code>,
          the agent enters the <strong>Onboarding</strong> stage — sandbox access, probation
          guardrails, and its first supervised interactions.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/onboarding")}>
          Next: Onboarding →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/team")}>
          ← Meet the Team
        </button>
      </div>
    </div>
  );
}
