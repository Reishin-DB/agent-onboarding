import { useNavigate } from "react-router-dom";

export default function RiskPage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Risk, Compliance & Liability</h1>
      <p className="page-subtitle">
        How the agent lifecycle keeps AI safe, auditable, and improvable at every stage —
        using Unity Catalog fine-grained access control, audit logging, and lineage.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🛡️</div>
        <div>
          <strong>The principle:</strong> Governance isn't a tax on innovation — it's the
          foundation that makes AI agents trustworthy enough to deploy in production. Every
          lifecycle stage has built-in risk controls, and they all flow through the same
          Databricks governance stack.
        </div>
      </div>

      {/* ── Risk Levels ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">AGENT RISK CLASSIFICATION</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        Not all agents are created equal. High-risk agents get stricter review cycles,
        more approvers, and tighter blast radius controls.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {[
          {
            level: "Low Risk", color: "#10b981", icon: "🟢",
            examples: "Read-only analytics, report generation",
            controls: "Standard review cycle (monthly), self-serve compute, single approver",
          },
          {
            level: "Medium Risk", color: "#f59e0b", icon: "🟡",
            examples: "Inventory monitoring, crew scheduling",
            controls: "Bi-weekly reviews, rate-limited writes, two approvers, column masking on PII",
          },
          {
            level: "High Risk", color: "#ef4444", icon: "🔴",
            examples: "Health monitoring, maintenance planning",
            controls: "Weekly reviews, human-in-loop for critical actions, three approvers, row filters enforced",
          },
          {
            level: "Critical Risk", color: "#8b5cf6", icon: "🟣",
            examples: "Drilling operations, well-control escalations",
            controls: "Daily reviews during probation, all outputs require approval, four approvers, extended 90-day probation",
          },
        ].map((r) => (
          <div key={r.level} className="card" style={{ borderTop: `3px solid ${r.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{r.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: r.color }}>{r.level}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8 }}>
              <strong>Examples:</strong> {r.examples}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>
              <strong>Controls:</strong> {r.controls}
            </div>
          </div>
        ))}
      </div>

      {/* ── Governance at Each Stage ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">GOVERNANCE AT EVERY LIFECYCLE STAGE</span>
        <div className="divider-line" />
      </div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Access Control</th>
              <th>Monitoring</th>
              <th>Blast Radius</th>
              <th>Human Oversight</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                stage: "📋 Hiring", access: "No access yet — role template defines future scope",
                monitor: "Requisition approval audit trail", blast: "Zero — agent doesn't exist yet",
                human: "Approval chain must sign off",
              },
              {
                stage: "🪪 Onboarding", access: "Sandbox only, DENY on production",
                monitor: "Daily onboarding event checks", blast: "Sandbox data only, rate-limited",
                human: "All outputs reviewed",
              },
              {
                stage: "🎓 Training", access: "Staging models, limited production read",
                monitor: "MLflow experiment tracking, feedback collection", blast: "Staging compute, no prod writes",
                human: "Manager reviews training progress",
              },
              {
                stage: "📊 Review", access: "Production scope per role template",
                monitor: "Weekly eval Job, metric dashboards", blast: "Scoped by UC grants",
                human: "Review sign-off required",
              },
              {
                stage: "🚀 Growth", access: "Expanded grants, new tools",
                monitor: "Increased monitoring post-promotion", blast: "Incremental — new grants only",
                human: "Promotion requires approval",
              },
              {
                stage: "📦 Retire", access: "All access revoked, SP disabled",
                monitor: "History preserved, queryable forever", blast: "Zero — agent is inactive",
                human: "Offboarding checklist sign-off",
              },
            ].map((row) => (
              <tr key={row.stage}>
                <td className="cell-agent">{row.stage}</td>
                <td style={{ fontSize: 12 }}>{row.access}</td>
                <td style={{ fontSize: 12 }}>{row.monitor}</td>
                <td style={{ fontSize: 12 }}>{row.blast}</td>
                <td style={{ fontSize: 12 }}>{row.human}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── The Four Pillars ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">THE FOUR PILLARS OF AGENT GOVERNANCE</span>
        <div className="divider-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
        {[
          {
            icon: "🔐", title: "Identity & Attribution",
            text: "Every agent has a unique service principal. Every query, every action, every error is attributed to a specific agent identity. No shared accounts, no anonymous actions.",
            uc: "Service Principals, system.access.audit",
          },
          {
            icon: "🎯", title: "Least Privilege",
            text: "Agents get only the data they need, at the granularity they need it. Table-level GRANT/DENY, column masking for sensitive fields, row filters for scope control.",
            uc: "GRANT/DENY, Column Masks, Row Filters",
          },
          {
            icon: "📋", title: "Full Auditability",
            text: "Immutable system tables capture every query, access, denial, and grant change. Combined with the HR tables, you can trace any agent action back to its hiring requisition.",
            uc: "system.access.audit, system.access.table_lineage",
          },
          {
            icon: "🔄", title: "Continuous Governance",
            text: "Governance isn't a one-time setup. Scheduled evaluation Jobs continuously verify that agents stay within bounds. Performance degradation triggers automatic interventions.",
            uc: "Databricks Jobs, MLflow Model Registry",
          },
        ].map((p) => (
          <div key={p.title} className="card">
            <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{p.title}</h4>
            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5, marginBottom: 12 }}>{p.text}</p>
            <div className="uc-badge">
              <span className="uc-icon">🔐</span> {p.uc}
            </div>
          </div>
        ))}
      </div>

      {/* ── Monitoring Dashboard Concept ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">COMPLIANCE DASHBOARD QUERIES</span>
        <div className="divider-line" />
      </div>

      <div className="code-block">
        <span className="cm">-- Dashboard: Agent fleet health overview</span><br /><br />
        <span className="cm">-- 1. Active agents by lifecycle stage</span><br />
        <span className="kw">SELECT</span> lifecycle_stage, <span className="fn">count</span>(*) <span className="kw">AS</span> agent_count<br />
        <span className="kw">FROM</span> hr.agents <span className="kw">WHERE</span> is_active = <span className="kw">true</span><br />
        <span className="kw">GROUP BY</span> 1;<br /><br />
        <span className="cm">-- 2. Agents with policy violations (last 30 days)</span><br />
        <span className="kw">SELECT</span> a.agent_name, p.violation_count, p.recommendation<br />
        <span className="kw">FROM</span> hr.agent_performance_snapshots p<br />
        <span className="kw">JOIN</span> hr.agents a <span className="kw">ON</span> p.agent_id = a.agent_id<br />
        <span className="kw">WHERE</span> p.violation_count {">"} 0<br />
        &nbsp;&nbsp;<span className="kw">AND</span> p.review_period_end {">"}= <span className="fn">date_sub</span>(<span className="fn">current_date</span>(), 30);<br /><br />
        <span className="cm">-- 3. Denied access attempts (security monitoring)</span><br />
        <span className="kw">SELECT</span> user_identity.service_principal,<br />
        &nbsp;&nbsp;<span className="fn">count</span>(*) <span className="kw">AS</span> denied_attempts,<br />
        &nbsp;&nbsp;<span className="fn">collect_set</span>(request_params.table_name) <span className="kw">AS</span> tables_attempted<br />
        <span className="kw">FROM</span> system.access.audit<br />
        <span className="kw">WHERE</span> response.statusCode = <span className="str">'PERMISSION_DENIED'</span><br />
        &nbsp;&nbsp;<span className="kw">AND</span> event_date {">"}= <span className="fn">date_sub</span>(<span className="fn">current_date</span>(), 7)<br />
        <span className="kw">GROUP BY</span> 1 <span className="kw">ORDER BY</span> 2 <span className="kw">DESC</span>;
      </div>

      <div className="card" style={{ marginTop: 48, textAlign: "center", padding: 32, borderColor: "rgba(255,54,33,0.2)" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The Bottom Line</h3>
        <p style={{ fontSize: 14, color: "var(--text-dim)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          The agent lifecycle isn't just an HR metaphor — it's a concrete governance framework
          built on primitives you already use. Unity Catalog handles identity and access. MLflow
          handles model versioning. Delta tables handle audit trails. Databricks Jobs handle
          automation. <strong>No new tools needed. Just a new way to use the ones you have.</strong>
        </p>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/architecture")}>
          View the Architecture →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/offboarding")}>
          ← Back to Offboarding
        </button>
      </div>
    </div>
  );
}
