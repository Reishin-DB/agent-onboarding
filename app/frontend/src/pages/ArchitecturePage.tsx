import React from "react";
import { useNavigate } from "react-router-dom";

export default function ArchitecturePage() {
  const nav = useNavigate();

  const svg = `
<svg viewBox="0 0 960 620" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
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

  <rect width="960" height="620" fill="#0b0f1a" rx="12"/>

  <text x="20" y="45" class="label">DATA SOURCES</text>
  <text x="20" y="235" class="label">LAKEHOUSE PLATFORM</text>
  <text x="20" y="455" class="label">AGENTIC CONSUMERS</text>

  <rect x="40"  y="60" width="160" height="56" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="120" y="84" text-anchor="middle" class="title">🛢 Sensor IoT</text>
  <text x="120" y="100" text-anchor="middle" class="subtitle">SCADA / WITSML feeds</text>

  <rect x="240" y="60" width="160" height="56" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="320" y="84" text-anchor="middle" class="title">📊 SAP ERP</text>
  <text x="320" y="100" text-anchor="middle" class="subtitle">Work orders, inventory</text>

  <rect x="440" y="60" width="160" height="56" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="520" y="84" text-anchor="middle" class="title">👥 HR Systems</text>
  <text x="520" y="100" text-anchor="middle" class="subtitle">Crew certs, schedules</text>

  <rect x="640" y="60" width="160" height="56" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="720" y="84" text-anchor="middle" class="title">⛏ Drilling Ops</text>
  <text x="720" y="100" text-anchor="middle" class="subtitle">Operation state, params</text>

  <rect x="40"  y="165" width="200" height="56" class="box" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="140" y="189" text-anchor="middle" class="title" style="fill:#10b981">🥉 Bronze</text>
  <text x="140" y="205" text-anchor="middle" class="subtitle">Raw ingestion</text>

  <rect x="280" y="165" width="200" height="56" class="box" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="380" y="189" text-anchor="middle" class="title" style="fill:#3b82f6">🥈 Silver</text>
  <text x="380" y="205" text-anchor="middle" class="subtitle">Cleaned, enriched</text>

  <rect x="520" y="165" width="200" height="56" class="box" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="620" y="189" text-anchor="middle" class="title" style="fill:#f59e0b">🥇 Gold</text>
  <text x="620" y="205" text-anchor="middle" class="subtitle">Business-ready</text>

  <rect x="760" y="165" width="160" height="56" class="box" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="840" y="189" text-anchor="middle" class="title" style="fill:#8b5cf6">🤖 ML / AI</text>
  <text x="840" y="205" text-anchor="middle" class="subtitle">RUL models, agents</text>

  <path d="M120,116 L140,165" class="edge-track"/>
  <path d="M120,116 L140,165" class="edge edge-animated" stroke="#10b981"/>
  <path d="M320,116 L140,165" class="edge-track"/>
  <path d="M320,116 L140,165" class="edge edge-animated" stroke="#10b981"/>
  <path d="M520,116 L140,165" class="edge-track"/>
  <path d="M520,116 L140,165" class="edge edge-animated" stroke="#10b981"/>
  <path d="M720,116 L140,165" class="edge-track"/>
  <path d="M720,116 L140,165" class="edge edge-animated" stroke="#10b981"/>

  <path d="M240,193 L280,193" class="edge-track"/>
  <path d="M240,193 L280,193" class="edge edge-animated" stroke="#3b82f6"/>
  <path d="M480,193 L520,193" class="edge-track"/>
  <path d="M480,193 L520,193" class="edge edge-animated" stroke="#f59e0b"/>
  <path d="M720,193 L760,193" class="edge-track"/>
  <path d="M720,193 L760,193" class="edge edge-animated" stroke="#8b5cf6"/>

  <rect x="30" y="250" width="900" height="70" rx="10" fill="none" stroke="#ff3621" stroke-width="2" stroke-dasharray="6 3" opacity="0.7"/>
  <rect x="350" y="242" width="260" height="22" rx="6" fill="#0b0f1a"/>
  <text x="480" y="258" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#ff3621;">🛡️  UNITY CATALOG GOVERNANCE</text>

  <text x="100" y="278" text-anchor="middle" class="subtitle" style="font-size:10px;">Service Principals</text>
  <text x="300" y="278" text-anchor="middle" class="subtitle" style="font-size:10px;">GRANT / DENY</text>
  <text x="500" y="278" text-anchor="middle" class="subtitle" style="font-size:10px;">Column Masking</text>
  <text x="700" y="278" text-anchor="middle" class="subtitle" style="font-size:10px;">Row Filters</text>
  <text x="870" y="278" text-anchor="middle" class="subtitle" style="font-size:10px;">Audit Logs</text>

  <text x="100" y="302" text-anchor="middle" style="font-size:16px;">🪪</text>
  <text x="300" y="302" text-anchor="middle" style="font-size:16px;">🔑</text>
  <text x="500" y="302" text-anchor="middle" style="font-size:16px;">🙈</text>
  <text x="700" y="302" text-anchor="middle" style="font-size:16px;">🔍</text>
  <text x="870" y="302" text-anchor="middle" style="font-size:16px;">📋</text>

  <rect x="40"  y="365" width="160" height="80" class="box" fill="#1a0a0a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="120" y="393" text-anchor="middle" style="font-size:22px;">🩺</text>
  <text x="120" y="413" text-anchor="middle" class="title">HEALTH</text>
  <text x="120" y="429" text-anchor="middle" class="subtitle">Field Technician</text>

  <rect x="220" y="365" width="160" height="80" class="box" fill="#1a0f0a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="300" y="393" text-anchor="middle" style="font-size:22px;">🔧</text>
  <text x="300" y="413" text-anchor="middle" class="title">MAINTENANCE</text>
  <text x="300" y="429" text-anchor="middle" class="subtitle">Maint. Planner</text>

  <rect x="400" y="365" width="160" height="80" class="box" fill="#0a0f1a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="480" y="393" text-anchor="middle" style="font-size:22px;">📦</text>
  <text x="480" y="413" text-anchor="middle" class="title">SUPPLY CHAIN</text>
  <text x="480" y="429" text-anchor="middle" class="subtitle">Procurement</text>

  <rect x="580" y="365" width="160" height="80" class="box" fill="#0a1a12" stroke="#10b981" stroke-width="1.5"/>
  <text x="660" y="393" text-anchor="middle" style="font-size:22px;">👷</text>
  <text x="660" y="413" text-anchor="middle" class="title">CREW</text>
  <text x="660" y="429" text-anchor="middle" class="subtitle">Shift Supervisor</text>

  <rect x="760" y="365" width="160" height="80" class="box" fill="#10091a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="840" y="393" text-anchor="middle" style="font-size:22px;">⛽</text>
  <text x="840" y="413" text-anchor="middle" class="title">DRILLING</text>
  <text x="840" y="429" text-anchor="middle" class="subtitle">Ops Engineer</text>

  <path d="M140,221 L120,365" class="edge-track"/>
  <path d="M140,221 L120,365" class="edge edge-animated" stroke="#ef4444"/>
  <path d="M380,221 L300,365" class="edge-track"/>
  <path d="M380,221 L300,365" class="edge edge-animated" stroke="#f59e0b"/>
  <path d="M380,221 L480,365" class="edge-track"/>
  <path d="M380,221 L480,365" class="edge edge-animated" stroke="#3b82f6"/>
  <path d="M620,221 L660,365" class="edge-track"/>
  <path d="M620,221 L660,365" class="edge edge-animated" stroke="#10b981"/>
  <path d="M620,221 L840,365" class="edge-track"/>
  <path d="M620,221 L840,365" class="edge edge-animated" stroke="#8b5cf6"/>

  <text x="20" y="485" class="label">OUTPUTS</text>

  <rect x="100" y="500" width="180" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="190" y="524" text-anchor="middle" class="title">📋 Recommendations</text>
  <text x="190" y="538" text-anchor="middle" class="subtitle">Severity-ranked alerts</text>

  <rect x="320" y="500" width="180" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="410" y="524" text-anchor="middle" class="title">📝 Work Orders</text>
  <text x="410" y="538" text-anchor="middle" class="subtitle">SAP maintenance tasks</text>

  <rect x="540" y="500" width="180" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="630" y="524" text-anchor="middle" class="title">👷 Crew Assignments</text>
  <text x="630" y="538" text-anchor="middle" class="subtitle">Certified responders</text>

  <rect x="760" y="500" width="160" height="48" class="box" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="840" y="524" text-anchor="middle" class="title">🚨 Escalations</text>
  <text x="840" y="538" text-anchor="middle" class="subtitle">Well-control alerts</text>

  <path d="M120,445 L190,500" class="edge-track"/>
  <path d="M120,445 L190,500" class="edge edge-animated" stroke="#ef4444"/>
  <path d="M300,445 L410,500" class="edge-track"/>
  <path d="M300,445 L410,500" class="edge edge-animated" stroke="#f59e0b"/>
  <path d="M660,445 L630,500" class="edge-track"/>
  <path d="M660,445 L630,500" class="edge edge-animated" stroke="#10b981"/>
  <path d="M840,445 L840,500" class="edge-track"/>
  <path d="M840,445 L840,500" class="edge edge-animated" stroke="#8b5cf6"/>

  <text x="480" y="590" text-anchor="middle" style="font-size:11px;fill:#475569;">
    Every data flow passes through Unity Catalog governance — identity verified, access checked, action audited.
  </text>
</svg>`;

  return (
    <div className="page">
      <h1 className="page-title">Architecture</h1>
      <p className="page-subtitle">
        Data flows from sources through the medallion lakehouse, governed by Unity
        Catalog, to five specialized agents — each with scoped access.
      </p>

      {/* ── Context: What you're looking at ── */}
      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🗺️</div>
        <div>
          <strong>Reading the diagram:</strong> Data flows top-to-bottom. Sources at the top feed
          into the Bronze/Silver/Gold medallion layers. The <span style={{ color: "var(--accent)", fontWeight: 600 }}>dashed
          red line</span> is Unity Catalog — every data flow passes through it before reaching the
          agents below. Animated edges show active data movement.
        </div>
      </div>

      {/* ── The Diagram ── */}
      <div className="arch-container" style={{ marginTop: 24 }}>
        <div className="arch-legend">
          {[
            { color: "#10b981", label: "Bronze (raw)" },
            { color: "#3b82f6", label: "Silver (enriched)" },
            { color: "#f59e0b", label: "Gold (serving)" },
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

      {/* ── Layer-by-layer breakdown ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">LAYER BY LAYER</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        The architecture has four horizontal layers. Data flows downward from sources to agents,
        with Unity Catalog acting as the governance checkpoint between the platform and the
        consumers. Here's what happens at each layer:
      </p>

      <div className="arch-cards">
        {[
          {
            icon: "🔄",
            title: "Layer 1: Data Sources",
            text: "Four external systems feed the platform: SCADA/WITSML sensor feeds (real-time telemetry), SAP ERP (work orders, spare parts inventory), HR systems (crew certifications, shift schedules), and drilling operations (current op state, risk classification). Each source lands in Bronze as-is.",
            color: "#334155",
          },
          {
            icon: "🧹",
            title: "Layer 2: Medallion Lakehouse",
            text: "Bronze stores raw ingestion — no transformation, just schema-on-read. Silver applies cleaning, deduplication, joins, and enrichment. Gold provides business-ready aggregations. ML/AI models (like RUL prediction) read from Silver and write predictions back. All storage is Delta Lake on Unity Catalog.",
            color: "#3b82f6",
          },
          {
            icon: "🛡️",
            title: "Layer 3: Unity Catalog Governance",
            text: "The red dashed line is the control plane. Every query from an agent passes through five governance checks: Service Principal verification (is this agent who it claims?), GRANT/DENY evaluation (does it have permission?), Column Masking (should it see this field?), Row Filtering (should it see this row?), and Audit Logging (record what happened).",
            color: "#ff3621",
          },
          {
            icon: "🤖",
            title: "Layer 4: Agentic Consumers",
            text: "Five specialized agents consume data through their scoped permissions. Each agent reads only its authorized tables and writes only to its designated outputs. The HEALTH agent reads telemetry → writes recommendations. The MAINTENANCE agent reads RUL → writes work orders. No agent crosses another's boundary.",
            color: "#8b5cf6",
          },
        ].map((c) => (
          <div key={c.title} className="card arch-card" style={{ borderLeft: `3px solid ${c.color}` }}>
            <h4>{c.icon} {c.title}</h4>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      {/* ── The data flow example ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">FOLLOW THE DATA</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        Let's trace a single data path through the entire architecture to see governance
        in action:
      </p>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, rowGap: 20 }}>
          {[
            { num: "1", text: "A pressure sensor on the BOP stack emits a reading via SCADA. It arrives as raw JSON in the sensor_telemetry Bronze table.", color: "#10b981" },
            { num: "2", text: "A Lakeflow pipeline cleans the data — validates schema, deduplicates, converts units — and writes to the Silver telemetry table.", color: "#3b82f6" },
            { num: "3", text: "An ML model reads Silver telemetry, computes Remaining Useful Life (RUL) predictions, and writes to the Gold rul_predictions table.", color: "#f59e0b" },
            { num: "4", text: "The MAINTENANCE agent queries rul_predictions. Unity Catalog verifies: Is this agent-maintenance-planner? Does it have SELECT on this table? Log the query.", color: "#ff3621" },
            { num: "5", text: "The agent detects RUL < 90 days + active anomaly → generates a CRITICAL recommendation and INSERTs a work order into ops.gold.maintenance_orders.", color: "#8b5cf6" },
            { num: "6", text: "The full lineage is traceable: sensor reading → Bronze → Silver → Gold prediction → agent query → work order. Every step logged in system.access.audit.", color: "#94a3b8" },
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

      {/* ── The punchline ── */}
      <div className="card" style={{ marginTop: 48, textAlign: "center", padding: 32, borderColor: "rgba(255,54,33,0.2)" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The Bottom Line</h3>
        <p style={{ fontSize: 14, color: "var(--text-dim)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          AI agents are the newest users of your data platform. They read, write, decide,
          and act — just like people. Unity Catalog treats them the same way: <strong>give
          them an identity, scope their access, and audit everything</strong>. The governance
          model you already have is the governance model you need.
        </p>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/")}>
          ← Start from the Beginning
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/governance")}>
          Review the Governance Matrix
        </button>
      </div>
    </div>
  );
}
