import React from "react";
import { useNavigate } from "react-router-dom";

export default function ArchitecturePage() {
  const nav = useNavigate();

  const svg = `
<svg viewBox="0 0 960 720" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <style>
    text { font-family: 'Inter', system-ui, sans-serif; fill: #e2e8f0; }
    .title { font-size: 13px; font-weight: 700; }
    .subtitle { font-size: 10px; fill: #94a3b8; }
    .label { font-size: 9px; fill: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .box { rx: 8; }
    .edge { stroke-width: 2; fill: none; }
    .edge-animated { stroke-dasharray: 8 4; animation: fd 1.5s linear infinite; }
    .edge-track { stroke: rgba(255,255,255,0.04); stroke-width: 2; fill: none; }
    @keyframes fd { to { stroke-dashoffset: -24; } }
  </style>

  <rect width="960" height="720" fill="#0b0f1a" rx="12"/>

  <!-- Row 1: HR Layer -->
  <text x="20" y="30" class="label">AGENT HR LAYER</text>

  <rect x="40" y="42" width="145" height="52" class="box" fill="#1a0f0a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="112" y="64" text-anchor="middle" class="title" style="fill:#f59e0b">📋 Requisitions</text>
  <text x="112" y="80" text-anchor="middle" class="subtitle">Role templates, approval</text>

  <rect x="205" y="42" width="145" height="52" class="box" fill="#0a1a12" stroke="#10b981" stroke-width="1.5"/>
  <text x="277" y="64" text-anchor="middle" class="title" style="fill:#10b981">🪪 Onboarding</text>
  <text x="277" y="80" text-anchor="middle" class="subtitle">Sandbox, probation</text>

  <rect x="370" y="42" width="145" height="52" class="box" fill="#0a0f1a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="442" y="64" text-anchor="middle" class="title" style="fill:#3b82f6">🎓 Training</text>
  <text x="442" y="80" text-anchor="middle" class="subtitle">MLflow, feedback</text>

  <rect x="535" y="42" width="145" height="52" class="box" fill="#10091a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="607" y="64" text-anchor="middle" class="title" style="fill:#8b5cf6">📊 Reviews</text>
  <text x="607" y="80" text-anchor="middle" class="subtitle">Eval pipelines</text>

  <rect x="700" y="42" width="115" height="52" class="box" fill="#0a1a12" stroke="#10b981" stroke-width="1.5"/>
  <text x="757" y="64" text-anchor="middle" class="title" style="fill:#10b981">🚀 Growth</text>
  <text x="757" y="80" text-anchor="middle" class="subtitle">Promotions</text>

  <rect x="835" y="42" width="105" height="52" class="box" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="887" y="64" text-anchor="middle" class="title" style="fill:#94a3b8">📦 Retire</text>
  <text x="887" y="80" text-anchor="middle" class="subtitle">Archive</text>

  <!-- Connectors between HR stages -->
  <path d="M185,68 L205,68" class="edge edge-animated" stroke="#f59e0b"/>
  <path d="M350,68 L370,68" class="edge edge-animated" stroke="#10b981"/>
  <path d="M515,68 L535,68" class="edge edge-animated" stroke="#3b82f6"/>
  <path d="M680,68 L700,68" class="edge edge-animated" stroke="#8b5cf6"/>
  <path d="M815,68 L835,68" class="edge edge-animated" stroke="#10b981"/>

  <!-- Row 2: Data Sources -->
  <text x="20" y="130" class="label">DATA SOURCES</text>

  <rect x="40" y="142" width="195" height="52" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="137" y="164" text-anchor="middle" class="title">🛢 Sensor IoT</text>
  <text x="137" y="180" text-anchor="middle" class="subtitle">SCADA / WITSML feeds</text>

  <rect x="265" y="142" width="195" height="52" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="362" y="164" text-anchor="middle" class="title">📊 SAP ERP</text>
  <text x="362" y="180" text-anchor="middle" class="subtitle">Work orders, inventory</text>

  <rect x="490" y="142" width="195" height="52" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="587" y="164" text-anchor="middle" class="title">👥 HR Systems</text>
  <text x="587" y="180" text-anchor="middle" class="subtitle">Crew certs, schedules</text>

  <rect x="715" y="142" width="195" height="52" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="812" y="164" text-anchor="middle" class="title">⛏ Drilling Ops</text>
  <text x="812" y="180" text-anchor="middle" class="subtitle">Operation state, params</text>

  <!-- Row 3: Lakehouse -->
  <text x="20" y="230" class="label">LAKEHOUSE + HR TABLES</text>

  <rect x="40" y="242" width="185" height="52" class="box" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="132" y="264" text-anchor="middle" class="title" style="fill:#10b981">🥉 Bronze</text>
  <text x="132" y="280" text-anchor="middle" class="subtitle">Raw ingestion</text>

  <rect x="245" y="242" width="185" height="52" class="box" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="337" y="264" text-anchor="middle" class="title" style="fill:#3b82f6">🥈 Silver</text>
  <text x="337" y="280" text-anchor="middle" class="subtitle">Cleaned, enriched</text>

  <rect x="450" y="242" width="185" height="52" class="box" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="542" y="264" text-anchor="middle" class="title" style="fill:#f59e0b">🥇 Gold</text>
  <text x="542" y="280" text-anchor="middle" class="subtitle">Business-ready</text>

  <rect x="655" y="242" width="140" height="52" class="box" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="725" y="264" text-anchor="middle" class="title" style="fill:#8b5cf6">🤖 ML / AI</text>
  <text x="725" y="280" text-anchor="middle" class="subtitle">MLflow Registry</text>

  <rect x="815" y="242" width="125" height="52" class="box" fill="#0f172a" stroke="#ff3621" stroke-width="1.5"/>
  <text x="877" y="264" text-anchor="middle" class="title" style="fill:#ff3621">🏢 HR Tables</text>
  <text x="877" y="280" text-anchor="middle" class="subtitle">Agent lifecycle</text>

  <!-- Source to Bronze arrows -->
  <path d="M137,194 L132,242" class="edge-track"/>
  <path d="M137,194 L132,242" class="edge edge-animated" stroke="#10b981"/>
  <path d="M362,194 L132,242" class="edge-track"/>
  <path d="M362,194 L132,242" class="edge edge-animated" stroke="#10b981"/>
  <path d="M587,194 L132,242" class="edge-track"/>
  <path d="M587,194 L132,242" class="edge edge-animated" stroke="#10b981"/>
  <path d="M812,194 L132,242" class="edge-track"/>
  <path d="M812,194 L132,242" class="edge edge-animated" stroke="#10b981"/>

  <!-- Medallion flow -->
  <path d="M225,268 L245,268" class="edge-track"/>
  <path d="M225,268 L245,268" class="edge edge-animated" stroke="#3b82f6"/>
  <path d="M430,268 L450,268" class="edge-track"/>
  <path d="M430,268 L450,268" class="edge edge-animated" stroke="#f59e0b"/>
  <path d="M635,268 L655,268" class="edge-track"/>
  <path d="M635,268 L655,268" class="edge edge-animated" stroke="#8b5cf6"/>

  <!-- Unity Catalog Governance Bar -->
  <rect x="30" y="320" width="910" height="65" rx="10" fill="none" stroke="#ff3621" stroke-width="2" stroke-dasharray="6 3" opacity="0.7"/>
  <rect x="320" y="312" width="320" height="22" rx="6" fill="#0b0f1a"/>
  <text x="480" y="328" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#ff3621;">🛡️  UNITY CATALOG GOVERNANCE LAYER</text>

  <text x="100" y="350" text-anchor="middle" class="subtitle" style="font-size:10px;">Service Principals</text>
  <text x="280" y="350" text-anchor="middle" class="subtitle" style="font-size:10px;">GRANT / DENY</text>
  <text x="460" y="350" text-anchor="middle" class="subtitle" style="font-size:10px;">Column Masking</text>
  <text x="640" y="350" text-anchor="middle" class="subtitle" style="font-size:10px;">Row Filters</text>
  <text x="820" y="350" text-anchor="middle" class="subtitle" style="font-size:10px;">Audit Logs</text>

  <text x="100" y="372" text-anchor="middle" style="font-size:16px;">🪪</text>
  <text x="280" y="372" text-anchor="middle" style="font-size:16px;">🔑</text>
  <text x="460" y="372" text-anchor="middle" style="font-size:16px;">🙈</text>
  <text x="640" y="372" text-anchor="middle" style="font-size:16px;">🔍</text>
  <text x="820" y="372" text-anchor="middle" style="font-size:16px;">📋</text>

  <!-- Row 4: Agents -->
  <text x="20" y="415" class="label">AGENTIC CONSUMERS (LIFECYCLE-GOVERNED)</text>

  <rect x="40" y="427" width="160" height="80" class="box" fill="#1a0a0a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="120" y="455" text-anchor="middle" style="font-size:22px;">🩺</text>
  <text x="120" y="475" text-anchor="middle" class="title">HEALTH</text>
  <text x="120" y="491" text-anchor="middle" class="subtitle">Production ✅</text>

  <rect x="220" y="427" width="160" height="80" class="box" fill="#1a0f0a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="300" y="455" text-anchor="middle" style="font-size:22px;">🔧</text>
  <text x="300" y="475" text-anchor="middle" class="title">MAINTENANCE</text>
  <text x="300" y="491" text-anchor="middle" class="subtitle">Production ✅</text>

  <rect x="400" y="427" width="160" height="80" class="box" fill="#0a0f1a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="480" y="455" text-anchor="middle" style="font-size:22px;">📦</text>
  <text x="480" y="475" text-anchor="middle" class="title">SUPPLY CHAIN</text>
  <text x="480" y="491" text-anchor="middle" class="subtitle">Training 🎓</text>

  <rect x="580" y="427" width="160" height="80" class="box" fill="#0a1a12" stroke="#10b981" stroke-width="1.5"/>
  <text x="660" y="455" text-anchor="middle" style="font-size:22px;">👷</text>
  <text x="660" y="475" text-anchor="middle" class="title">CREW</text>
  <text x="660" y="491" text-anchor="middle" class="subtitle">Production ✅</text>

  <rect x="760" y="427" width="160" height="80" class="box" fill="#10091a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="840" y="455" text-anchor="middle" style="font-size:22px;">⛽</text>
  <text x="840" y="475" text-anchor="middle" class="title">DRILLING</text>
  <text x="840" y="491" text-anchor="middle" class="subtitle">Probation ⏳</text>

  <!-- Data to agent arrows -->
  <path d="M132,294 L120,427" class="edge-track"/>
  <path d="M132,294 L120,427" class="edge edge-animated" stroke="#ef4444"/>
  <path d="M337,294 L300,427" class="edge-track"/>
  <path d="M337,294 L300,427" class="edge edge-animated" stroke="#f59e0b"/>
  <path d="M337,294 L480,427" class="edge-track"/>
  <path d="M337,294 L480,427" class="edge edge-animated" stroke="#3b82f6"/>
  <path d="M542,294 L660,427" class="edge-track"/>
  <path d="M542,294 L660,427" class="edge edge-animated" stroke="#10b981"/>
  <path d="M542,294 L840,427" class="edge-track"/>
  <path d="M542,294 L840,427" class="edge edge-animated" stroke="#8b5cf6"/>

  <!-- Row 5: Outputs -->
  <text x="20" y="540" class="label">OUTPUTS</text>

  <rect x="80" y="555" width="180" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="579" text-anchor="middle" class="title">📋 Recommendations</text>
  <text x="170" y="593" text-anchor="middle" class="subtitle">Severity-ranked alerts</text>

  <rect x="290" y="555" width="180" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="380" y="579" text-anchor="middle" class="title">📝 Work Orders</text>
  <text x="380" y="593" text-anchor="middle" class="subtitle">SAP maintenance tasks</text>

  <rect x="500" y="555" width="180" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="590" y="579" text-anchor="middle" class="title">👷 Crew Assignments</text>
  <text x="590" y="593" text-anchor="middle" class="subtitle">Certified responders</text>

  <rect x="710" y="555" width="180" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="800" y="579" text-anchor="middle" class="title">🚨 Escalations</text>
  <text x="800" y="593" text-anchor="middle" class="subtitle">Well-control alerts</text>

  <!-- Agent to output arrows -->
  <path d="M120,507 L170,555" class="edge-track"/>
  <path d="M120,507 L170,555" class="edge edge-animated" stroke="#ef4444"/>
  <path d="M300,507 L380,555" class="edge-track"/>
  <path d="M300,507 L380,555" class="edge edge-animated" stroke="#f59e0b"/>
  <path d="M660,507 L590,555" class="edge-track"/>
  <path d="M660,507 L590,555" class="edge edge-animated" stroke="#10b981"/>
  <path d="M840,507 L800,555" class="edge-track"/>
  <path d="M840,507 L800,555" class="edge edge-animated" stroke="#8b5cf6"/>

  <!-- Row 6: Feedback Loop -->
  <text x="20" y="635" class="label">FEEDBACK LOOP (BACK TO HR LAYER)</text>

  <rect x="120" y="648" width="720" height="44" class="box" fill="#0f172a" stroke="#ff3621" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="480" y="672" text-anchor="middle" class="title" style="fill:#ff3621">🔄 Interactions → Feedback → Training → Review → Lifecycle Events → HR Tables</text>
  <text x="480" y="686" text-anchor="middle" class="subtitle">Every output feeds back into the agent's training pipeline and performance record</text>

  <!-- Feedback arrows -->
  <path d="M170,603 L480,648" class="edge-track"/>
  <path d="M170,603 L480,648" class="edge edge-animated" stroke="#ff3621"/>
  <path d="M800,603 L480,648" class="edge-track"/>
  <path d="M800,603 L480,648" class="edge edge-animated" stroke="#ff3621"/>

  <text x="480" y="712" text-anchor="middle" style="font-size:11px;fill:#475569;">
    Complete lifecycle: Hire → Onboard → Train → Review → Promote/Retire — all governed by Unity Catalog
  </text>
</svg>`;

  return (
    <div className="page">
      <h1 className="page-title">Architecture</h1>
      <p className="page-subtitle">
        The complete system: agent HR layer at the top, data lakehouse in the middle,
        Unity Catalog governance as the control plane, and a feedback loop that closes the lifecycle.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🗺️</div>
        <div>
          <strong>Reading the diagram:</strong> Data flows top-to-bottom. The <span style={{ color: "#f59e0b", fontWeight: 600 }}>top row</span> shows
          the agent HR lifecycle stages. Below that, data sources feed into the medallion lakehouse.
          The <span style={{ color: "var(--accent)", fontWeight: 600 }}>red dashed line</span> is Unity
          Catalog — every flow passes through it. At the bottom, outputs feed back into the
          training pipeline.
        </div>
      </div>

      <div className="arch-container" style={{ marginTop: 24 }}>
        <div className="arch-legend">
          {[
            { color: "#f59e0b", label: "HR Layer" },
            { color: "#10b981", label: "Bronze" },
            { color: "#3b82f6", label: "Silver" },
            { color: "#f59e0b", label: "Gold" },
            { color: "#8b5cf6", label: "ML / AI" },
            { color: "#ff3621", label: "UC Governance" },
          ].map((l) => (
            <div key={l.label} className="legend-item">
              <div className="legend-dot" style={{ background: l.color }} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}
        />
      </div>

      {/* ── Layer breakdown ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">WHAT'S NEW: THE HR LAYER + FEEDBACK LOOP</span>
        <div className="divider-line" />
      </div>

      <div className="arch-cards">
        {[
          {
            icon: "🏢", title: "Agent HR Layer (New)",
            text: "The top row is what makes this architecture different. Eight Delta tables (role_templates, requisitions, agents, onboarding_events, interactions, feedback, performance_snapshots, lifecycle_events) form a complete HR system for AI. Every lifecycle transition is recorded here.",
            color: "#ff3621",
          },
          {
            icon: "🔄", title: "Feedback Loop (New)",
            text: "Outputs from agents feed back into the HR layer: interactions are logged, humans provide feedback, training pipelines retrain models, evaluation Jobs run reviews, and lifecycle events track promotions or coaching. It's a closed loop — agents continuously improve.",
            color: "#8b5cf6",
          },
          {
            icon: "🛡️", title: "Unity Catalog Governance",
            text: "The control plane between data and agents. Service principals give each agent identity. GRANT/DENY controls access. Column masking and row filters provide fine-grained scoping. Audit logs capture everything. Lifecycle stage determines what level of access each agent has.",
            color: "#ff3621",
          },
          {
            icon: "📊", title: "Medallion Lakehouse",
            text: "Bronze stores raw ingestion, Silver cleans and enriches, Gold provides business-ready views. ML models read from Silver and write predictions back. HR tables sit alongside as first-class citizens in Unity Catalog.",
            color: "#3b82f6",
          },
        ].map((c) => (
          <div key={c.title} className="card arch-card" style={{ borderLeft: `3px solid ${c.color}` }}>
            <h4>{c.icon} {c.title}</h4>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      {/* ── Implementation Guide ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">PUTTING IT ALL TOGETHER</span>
        <div className="divider-line" />
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>How to implement this as an Agent HR Layer</h3>
        <div style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, rowGap: 20 }}>
          {[
            { num: "1", text: "Create the hr schema in Unity Catalog with the 8 lifecycle tables. These are standard Delta tables — no special infrastructure needed.", color: "#10b981" },
            { num: "2", text: "Build a provisioning Job that creates service principals, applies base grants, and writes to hr.agents and hr.agent_onboarding_events when a new requisition is approved.", color: "#3b82f6" },
            { num: "3", text: "Instrument your agents to log every interaction to hr.agent_interactions. Collect human feedback into hr.agent_feedback. This is the training data pipeline.", color: "#f59e0b" },
            { num: "4", text: "Schedule a weekly evaluation Job that computes performance metrics, writes to hr.agent_performance_snapshots, and emits recommendations (promote/maintain/coach/freeze/retire).", color: "#8b5cf6" },
            { num: "5", text: "Build automation (Jobs or webhooks) that act on review recommendations: adjust UC grants for promotions, trigger retraining for coaching, run offboarding playbooks for retirements.", color: "#ef4444" },
            { num: "6", text: "Create an AI/BI dashboard on top of the HR tables for fleet-wide visibility: agent count by stage, performance trends, violation alerts, and compliance status.", color: "#ff3621" },
          ].map((step) => (
            <React.Fragment key={step.num}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: step.color + "20",
                color: step.color, display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>
                {step.num}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5, paddingTop: 6 }}>
                {step.text}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 32, textAlign: "center", padding: 32, borderColor: "rgba(255,54,33,0.2)" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The Bottom Line</h3>
        <p style={{ fontSize: 14, color: "var(--text-dim)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          AI agents are the newest employees in your organization. They read data, make decisions,
          and take actions — just like people. The agent HR layer gives them the same lifecycle
          governance: <strong>hire, onboard, train, review, promote, and retire</strong> — all
          built on Databricks primitives you already know.
        </p>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/")}>
          ← Start from the Beginning
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/risk")}>
          Review Risk & Compliance
        </button>
      </div>
    </div>
  );
}
