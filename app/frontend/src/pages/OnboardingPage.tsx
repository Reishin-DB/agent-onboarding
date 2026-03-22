import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Day 1: Onboarding</h1>
      <p className="page-subtitle">
        Every agent follows the same 3-step onboarding process — identity,
        access, and audit. No shortcuts, no exceptions.
      </p>

      {/* ── Context: Why this matters ── */}
      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🏢</div>
        <div>
          <strong>The HR analogy:</strong> When a new employee joins, HR doesn't hand them
          the keys to every system. They get an identity (SSO), role-based access (only what
          their job requires), and everything they do is logged (compliance). AI agents
          deserve the exact same treatment.
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="onboarding-progress" style={{ marginTop: 40 }}>
        <div className="progress-track">
          <div className="progress-step active">
            <div className="progress-dot">🪪</div>
            <span>Identity</span>
          </div>
          <div className="progress-connector" />
          <div className="progress-step active">
            <div className="progress-dot">🔑</div>
            <span>Access</span>
          </div>
          <div className="progress-connector" />
          <div className="progress-step active">
            <div className="progress-dot">📋</div>
            <span>Audit</span>
          </div>
        </div>
      </div>

      <div className="flow-steps" style={{ marginTop: 40 }}>
        {/* ══ Step 1: Identity ══ */}
        <div className="flow-step">
          <div className="step-marker">
            <div className="step-number">1</div>
            <div className="step-label">Identity</div>
          </div>
          <div className="step-content">
            <h3>Create a Service Principal</h3>
            <p>
              Just like a new employee gets an SSO account, each agent gets a
              <strong> service principal</strong> in Unity Catalog. This is their
              identity — unique, auditable, and revocable.
            </p>

            <div className="step-detail-grid">
              <div className="step-detail-item">
                <span className="step-detail-label">Human equivalent</span>
                <span className="step-detail-value">Employee SSO account</span>
              </div>
              <div className="step-detail-item">
                <span className="step-detail-label">UC mechanism</span>
                <span className="step-detail-value">Service Principal</span>
              </div>
              <div className="step-detail-item">
                <span className="step-detail-label">Key property</span>
                <span className="step-detail-value">Unique, revocable, auditable</span>
              </div>
            </div>

            <div className="code-block">
              <span className="cm">-- Create identity for the HEALTH agent</span><br />
              <span className="kw">CREATE</span> <span className="fn">SERVICE PRINCIPAL</span>{" "}
              <span className="str">'agent-health-monitor'</span><br />
              &nbsp;&nbsp;<span className="kw">COMMENT</span>{" "}
              <span className="str">'BOP Health monitoring agent — reads sensor telemetry'</span>;
              <br /><br />
              <span className="cm">-- Same for every agent in the fleet</span><br />
              <span className="kw">CREATE</span> <span className="fn">SERVICE PRINCIPAL</span>{" "}
              <span className="str">'agent-maintenance-planner'</span>;
              <br />
              <span className="kw">CREATE</span> <span className="fn">SERVICE PRINCIPAL</span>{" "}
              <span className="str">'agent-supply-chain'</span>;
              <br />
              <span className="kw">CREATE</span> <span className="fn">SERVICE PRINCIPAL</span>{" "}
              <span className="str">'agent-crew-supervisor'</span>;
              <br />
              <span className="kw">CREATE</span> <span className="fn">SERVICE PRINCIPAL</span>{" "}
              <span className="str">'agent-drilling-ops'</span>;
            </div>

            <div className="callout-box" style={{ marginTop: 16, background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}>
              <div className="callout-icon">✅</div>
              <div style={{ fontSize: 13 }}>
                <strong>Result:</strong> Each agent now has a distinct identity in Unity Catalog.
                Every action they take will be attributed to this specific principal —
                no more shared service accounts where you can't tell which agent did what.
              </div>
            </div>
          </div>
        </div>

        {/* ── Transition ── */}
        <div className="step-transition">
          <span>Identity established. Now — what can this agent actually access?</span>
        </div>

        {/* ══ Step 2: Access ══ */}
        <div className="flow-step">
          <div className="step-marker">
            <div className="step-number">2</div>
            <div className="step-label">Access</div>
          </div>
          <div className="step-content">
            <h3>Grant Role-Based Permissions</h3>
            <p>
              Each agent gets <strong>only the data they need</strong> — nothing
              more. Unity Catalog grants work at table, column, and row level.
              The HEALTH agent can read sensor telemetry but never sees crew
              schedules or cost data.
            </p>

            <div className="step-detail-grid">
              <div className="step-detail-item">
                <span className="step-detail-label">Human equivalent</span>
                <span className="step-detail-value">Role-based access (RBAC)</span>
              </div>
              <div className="step-detail-item">
                <span className="step-detail-label">UC mechanism</span>
                <span className="step-detail-value">GRANT / DENY + masks + filters</span>
              </div>
              <div className="step-detail-item">
                <span className="step-detail-label">Key property</span>
                <span className="step-detail-value">Least privilege, multi-level</span>
              </div>
            </div>

            <div className="code-block">
              <span className="cm">-- HEALTH agent: read-only sensor access</span><br />
              <span className="kw">GRANT</span> <span className="fn">SELECT</span>{" "}
              <span className="kw">ON TABLE</span> sensors.bronze.telemetry<br />
              &nbsp;&nbsp;<span className="kw">TO</span>{" "}
              <span className="str">`agent-health-monitor`</span>;
              <br /><br />
              <span className="cm">-- MAINTENANCE agent: read RUL + write work orders</span><br />
              <span className="kw">GRANT</span> <span className="fn">SELECT</span>{" "}
              <span className="kw">ON TABLE</span> analytics.silver.rul_predictions<br />
              &nbsp;&nbsp;<span className="kw">TO</span>{" "}
              <span className="str">`agent-maintenance-planner`</span>;
              <br />
              <span className="kw">GRANT</span> <span className="fn">INSERT</span>{" "}
              <span className="kw">ON TABLE</span> ops.gold.maintenance_orders<br />
              &nbsp;&nbsp;<span className="kw">TO</span>{" "}
              <span className="str">`agent-maintenance-planner`</span>;
              <br /><br />
              <span className="cm">-- Column masking: CREW agent can't see cost columns</span><br />
              <span className="kw">ALTER TABLE</span> ops.gold.crew_assignments<br />
              &nbsp;&nbsp;<span className="kw">ALTER COLUMN</span> hourly_rate{" "}
              <span className="kw">SET MASK</span> <span className="fn">mask_cost_data</span>;
              <br /><br />
              <span className="cm">-- Row filter: DRILLING agent sees only active ops</span><br />
              <span className="kw">ALTER TABLE</span> ops.gold.drilling_operations<br />
              &nbsp;&nbsp;<span className="kw">SET ROW FILTER</span> <span className="fn">active_ops_only</span>{" "}
              <span className="kw">ON</span> (status);
            </div>

            {/* ── Access levels breakdown ── */}
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Three levels of access control:</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { level: "Table-Level", desc: "GRANT SELECT on specific tables. The HEALTH agent sees telemetry but never crew rosters.", color: "var(--green)" },
                { level: "Column-Level", desc: "Column masking hides sensitive fields. The CREW agent queries assignments but hourly_rate returns NULL.", color: "var(--blue)" },
                { level: "Row-Level", desc: "Row filters restrict which rows are visible. The DRILLING agent only sees active operations, not historical.", color: "var(--purple)" },
              ].map((l) => (
                <div key={l.level} className="card" style={{ padding: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: l.color, marginBottom: 6 }}>{l.level}</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>{l.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Transition ── */}
        <div className="step-transition">
          <span>Permissions locked in. But how do we verify agents stay within bounds?</span>
        </div>

        {/* ══ Step 3: Audit ══ */}
        <div className="flow-step">
          <div className="step-marker">
            <div className="step-number">3</div>
            <div className="step-label">Audit</div>
          </div>
          <div className="step-content">
            <h3>Monitor Everything They Do</h3>
            <p>
              Unity Catalog <strong>system tables</strong> capture every query,
              every data access, every grant change. When an agent acts, you know
              exactly what data informed that decision — full lineage, full
              traceability.
            </p>

            <div className="step-detail-grid">
              <div className="step-detail-item">
                <span className="step-detail-label">Human equivalent</span>
                <span className="step-detail-value">Compliance logging, SOX audits</span>
              </div>
              <div className="step-detail-item">
                <span className="step-detail-label">UC mechanism</span>
                <span className="step-detail-value">system.access.audit + lineage</span>
              </div>
              <div className="step-detail-item">
                <span className="step-detail-label">Key property</span>
                <span className="step-detail-value">Immutable, queryable, complete</span>
              </div>
            </div>

            <div className="code-block">
              <span className="cm">-- What did the HEALTH agent access today?</span><br />
              <span className="kw">SELECT</span> event_time, action_name, request_params.table_name<br />
              <span className="kw">FROM</span> system.access.audit<br />
              <span className="kw">WHERE</span> user_identity.service_principal ={" "}
              <span className="str">'agent-health-monitor'</span><br />
              &nbsp;&nbsp;<span className="kw">AND</span> event_date = current_date()<br />
              <span className="kw">ORDER BY</span> event_time <span className="kw">DESC</span>;
              <br /><br />
              <span className="cm">-- Trace data lineage: what feeds the agent's decisions?</span><br />
              <span className="kw">SELECT</span> *<br />
              <span className="kw">FROM</span> system.access.table_lineage<br />
              <span className="kw">WHERE</span> target_table_name = <span className="str">'recommendations'</span>;
              <br /><br />
              <span className="cm">-- Find denied access attempts (potential red flags)</span><br />
              <span className="kw">SELECT</span> event_time, user_identity.service_principal, request_params<br />
              <span className="kw">FROM</span> system.access.audit<br />
              <span className="kw">WHERE</span> action_name = <span className="str">'denied'</span><br />
              &nbsp;&nbsp;<span className="kw">AND</span> event_date {">"}= current_date() - <span className="fn">INTERVAL</span> 7 <span className="kw">DAYS</span>;
            </div>

            {/* ── What the audit trail reveals ── */}
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>What you can answer with audit data:</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { q: "Which data informed this recommendation?", a: "Table lineage traces data → decision" },
                { q: "Did any agent access data outside its role?", a: "Denied queries are logged with full context" },
                { q: "How often does each agent query each table?", a: "Frequency analysis via system.access.audit" },
                { q: "Has an agent's access pattern changed?", a: "Behavioral drift detection over time" },
              ].map((item) => (
                <div key={item.q} className="card" style={{ padding: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{item.q}</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.4 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Insight ── */}
      <div className="card" style={{ marginTop: 48, textAlign: "center", padding: 32, borderColor: "rgba(255,54,33,0.2)" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>💡</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The Key Insight</h3>
        <p style={{ fontSize: 14, color: "var(--text-dim)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
          The same governance model that protects your data from human error
          protects it from agent error. <strong>Identity → Access → Audit</strong>{" "}
          isn't a new framework — it's the one you already have. Unity Catalog
          just makes it work for machines too.
        </p>
      </div>

      {/* ── Next: Governance Matrix ── */}
      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">📊</div>
        <div>
          <strong>Want to see it all at once?</strong> The Governance Matrix shows every agent's
          permissions across every data asset in a single view — who can read what, who's
          denied, and what happens when an agent goes out of bounds.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <button className="btn btn-primary" onClick={() => nav("/governance")}>
          View the Governance Matrix →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/architecture")}>
          See the Full Architecture
        </button>
      </div>
    </div>
  );
}
