import { useNavigate } from "react-router-dom";

export default function PerformancePage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Stage 4: Performance Reviews</h1>
      <p className="page-subtitle">
        Formal, recurring evaluation pipelines that measure agent performance against
        targets — accuracy, latency, cost, policy compliance, and user satisfaction.
        Underperformers get coached. Top performers get promoted.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">📊</div>
        <div>
          <strong>The HR analogy:</strong> Quarterly performance reviews. Managers evaluate employees
          against KPIs, provide feedback, and decide: promote, maintain, or put on a performance
          improvement plan. Agents get the exact same treatment — except the evaluations are
          automated, data-driven, and run as scheduled Databricks Jobs.
        </div>
      </div>

      {/* ── Metrics Tracked ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">THE AGENT SCORECARD</span>
        <div className="divider-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginTop: 16 }}>
        {[
          { metric: "Accuracy", value: "94%", target: "> 90%", status: "pass", icon: "🎯" },
          { metric: "Latency (p50)", value: "120ms", target: "< 200ms", status: "pass", icon: "⚡" },
          { metric: "Latency (p99)", value: "890ms", target: "< 1000ms", status: "pass", icon: "⏱️" },
          { metric: "Cost / Action", value: "$0.003", target: "< $0.01", status: "pass", icon: "💰" },
          { metric: "Violations", value: "0", target: "= 0", status: "pass", icon: "🛡️" },
          { metric: "User Satisfaction", value: "4.6/5", target: "> 4.0", status: "pass", icon: "⭐" },
        ].map((m) => (
          <div key={m.metric} className="card metric-card">
            <div style={{ fontSize: 22, marginBottom: 4 }}>{m.icon}</div>
            <div className="metric-value">{m.value}</div>
            <div className="metric-label">{m.metric}</div>
            <div className={`metric-target ${m.status}`}>Target: {m.target}</div>
          </div>
        ))}
      </div>

      {/* ── Performance Snapshots Table ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">STORING THE REVIEWS</span>
        <div className="divider-line" />
      </div>

      <div className="schema-card">
        <h3>hr.agent_performance_snapshots</h3>
        <p>Periodic performance reviews — the quarterly evaluation stored in Delta</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["snapshot_id", "STRING", "Unique snapshot ID"],
              ["agent_id", "STRING", "FK to agents"],
              ["review_period_start", "DATE", "Review window start"],
              ["review_period_end", "DATE", "Review window end"],
              ["accuracy_score", "DOUBLE", "% correct actions"],
              ["latency_p50_ms", "INT", "Median response time"],
              ["latency_p99_ms", "INT", "99th percentile response time"],
              ["cost_per_action_usd", "DOUBLE", "Average cost per action"],
              ["violation_count", "INT", "Policy violations in period"],
              ["user_satisfaction", "DOUBLE", "Avg user rating (1-5)"],
              ["actions_total", "INT", "Total actions in period"],
              ["model_version", "STRING", "Model used during period"],
              ["recommendation", "STRING", "promote | maintain | coach | freeze | retire"],
              ["reviewer_id", "STRING", "Human reviewer who signed off"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── The Evaluation Job ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">THE EVALUATION PIPELINE</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        A scheduled Databricks Job runs weekly (or on-demand) to evaluate every active agent.
        It compares current performance to targets, checks for drift, and emits a recommendation.
      </p>

      <div className="code-block">
        <span className="cm">-- Weekly evaluation Job: hr_agent_performance_review</span><br /><br />
        <span className="cm">-- Step 1: Compute metrics for each agent</span><br />
        <span className="kw">INSERT INTO</span> hr.agent_performance_snapshots<br />
        <span className="kw">SELECT</span><br />
        &nbsp;&nbsp;<span className="fn">uuid</span>() <span className="kw">AS</span> snapshot_id,<br />
        &nbsp;&nbsp;a.agent_id,<br />
        &nbsp;&nbsp;<span className="fn">date_sub</span>(<span className="fn">current_date</span>(), 7) <span className="kw">AS</span> review_period_start,<br />
        &nbsp;&nbsp;<span className="fn">current_date</span>() <span className="kw">AS</span> review_period_end,<br />
        &nbsp;&nbsp;<span className="cm">-- Accuracy: correct actions / total actions</span><br />
        &nbsp;&nbsp;<span className="fn">avg</span>(<span className="kw">CASE WHEN</span> f.feedback_type = <span className="str">'thumbs_up'</span> <span className="kw">THEN</span> 1.0 <span className="kw">ELSE</span> 0.0 <span className="kw">END</span>) <span className="kw">AS</span> accuracy_score,<br />
        &nbsp;&nbsp;<span className="fn">percentile</span>(i.latency_ms, 0.5) <span className="kw">AS</span> latency_p50_ms,<br />
        &nbsp;&nbsp;<span className="fn">percentile</span>(i.latency_ms, 0.99) <span className="kw">AS</span> latency_p99_ms,<br />
        &nbsp;&nbsp;<span className="fn">avg</span>(i.token_count * 0.00001) <span className="kw">AS</span> cost_per_action_usd,<br />
        &nbsp;&nbsp;<span className="fn">count_if</span>(i.interaction_type = <span className="str">'violation'</span>) <span className="kw">AS</span> violation_count,<br />
        &nbsp;&nbsp;<span className="fn">count</span>(*) <span className="kw">AS</span> actions_total,<br />
        &nbsp;&nbsp;a.current_model_version,<br />
        &nbsp;&nbsp;<span className="cm">-- Auto-recommendation based on rules</span><br />
        &nbsp;&nbsp;<span className="kw">CASE</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">WHEN</span> violation_count {">"} 0 <span className="kw">THEN</span> <span className="str">'freeze'</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">WHEN</span> accuracy_score {"<"} 0.80 <span className="kw">THEN</span> <span className="str">'coach'</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">WHEN</span> accuracy_score {">"} 0.95 <span className="kw">THEN</span> <span className="str">'promote'</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">ELSE</span> <span className="str">'maintain'</span><br />
        &nbsp;&nbsp;<span className="kw">END</span> <span className="kw">AS</span> recommendation<br />
        <span className="kw">FROM</span> hr.agents a<br />
        <span className="kw">JOIN</span> hr.agent_interactions i <span className="kw">ON</span> a.agent_id = i.agent_id<br />
        <span className="kw">LEFT JOIN</span> hr.agent_feedback f <span className="kw">ON</span> i.interaction_id = f.interaction_id<br />
        <span className="kw">WHERE</span> a.is_active = <span className="kw">true</span><br />
        &nbsp;&nbsp;<span className="kw">AND</span> i.created_at {">"}= <span className="fn">date_sub</span>(<span className="fn">current_date</span>(), 7)<br />
        <span className="kw">GROUP BY</span> a.agent_id, a.current_model_version;
      </div>

      {/* ── Decision Rules ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">OUTCOME-BASED DECISIONS</span>
        <div className="divider-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {[
          {
            outcome: "Promote", icon: "🚀", color: "#10b981",
            rule: "Accuracy > 95% for 3 consecutive reviews, zero violations",
            action: "Broader data access, more advanced tools, higher autonomy",
          },
          {
            outcome: "Maintain", icon: "✅", color: "#3b82f6",
            rule: "All metrics within target ranges",
            action: "Continue as-is, no changes to access or model",
          },
          {
            outcome: "Coach", icon: "📝", color: "#f59e0b",
            rule: "Accuracy < 85% OR user satisfaction < 3.5",
            action: "Trigger retraining pipeline, restrict to staging model, increase review cadence",
          },
          {
            outcome: "Freeze", icon: "🧊", color: "#ef4444",
            rule: "Any policy violation OR accuracy < 70%",
            action: "Revoke production access, revert to sandbox mode, flag for human review",
          },
          {
            outcome: "Retire", icon: "📦", color: "#94a3b8",
            rule: "Consistently underperforming for 3+ review cycles",
            action: "Trigger offboarding flow, archive models, preserve lineage",
          },
        ].map((o) => (
          <div key={o.outcome} className="card" style={{ borderLeft: `3px solid ${o.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{o.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: o.color }}>{o.outcome}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8, lineHeight: 1.4 }}>
              <strong>Rule:</strong> {o.rule}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.4 }}>
              <strong>Action:</strong> {o.action}
            </div>
          </div>
        ))}
      </div>

      {/* ── Coaching Flow ── */}
      <div className="callout-box" style={{ marginTop: 32, background: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}>
        <div className="callout-icon">📝</div>
        <div>
          <strong>Coaching flow:</strong> When an agent is placed on coaching, three things happen
          automatically: (1) Its model is downgraded to Staging in the MLflow Registry,
          (2) its UC grants are narrowed to sandbox + read-only, and (3) a retraining Job
          is triggered using the latest feedback data. The agent stays on coaching until the
          next review cycle shows improvement.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/promotions")}>
          Next: Promotions & Growth →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/training")}>
          ← Back to Training
        </button>
      </div>
    </div>
  );
}
