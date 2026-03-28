import { useNavigate } from "react-router-dom";

export default function TrainingPage() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Stage 3: Training & Development</h1>
      <p className="page-subtitle">
        Agents learn from every interaction. Feedback loops, MLflow experiments, and model
        retraining pipelines turn raw experience into better performance — just like
        employee upskilling programs.
      </p>

      <div className="callout-box" style={{ marginTop: 32 }}>
        <div className="callout-icon">🎓</div>
        <div>
          <strong>The HR analogy:</strong> Employee development isn't a one-time event — it's
          continuous. Regular training, feedback from managers, skill assessments, and
          certifications. Agent training works the same way: log everything, learn from feedback,
          retrain, and promote the model when it's ready.
        </div>
      </div>

      {/* ── Interaction Logging ── */}
      <div className="divider-section" style={{ marginTop: 40 }}>
        <div className="divider-line" />
        <span className="divider-label">STEP 1: LOG EVERY INTERACTION</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        Every agent action — queries, recommendations, tool calls, errors — is logged
        to Delta tables under Unity Catalog. This is the training data pipeline.
      </p>

      <div className="schema-card">
        <h3>hr.agent_interactions</h3>
        <p>Every action the agent takes — the activity log that becomes training data</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["interaction_id", "STRING", "Unique interaction ID"],
              ["agent_id", "STRING", "FK to agents"],
              ["interaction_type", "STRING", "query | recommendation | escalation | tool_call"],
              ["input_summary", "STRING", "What triggered this action"],
              ["output_summary", "STRING", "What the agent produced"],
              ["tables_accessed", "ARRAY<STRING>", "Tables read during this action"],
              ["model_version", "STRING", "Model version used"],
              ["latency_ms", "INT", "Processing time"],
              ["token_count", "INT", "Tokens consumed (if LLM-based)"],
              ["created_at", "TIMESTAMP", "Interaction timestamp"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Feedback Collection ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">STEP 2: COLLECT HUMAN FEEDBACK</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 16 }}>
        Humans review agent outputs and provide structured feedback — thumbs up/down,
        corrections, and escalations. This feedback is the <strong>coaching signal</strong>.
      </p>

      <div className="schema-card">
        <h3>hr.agent_feedback</h3>
        <p>Human feedback on agent actions — the coaching notes</p>
        <table className="schema-table">
          <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ["feedback_id", "STRING", "Unique feedback ID"],
              ["interaction_id", "STRING", "FK to interactions"],
              ["agent_id", "STRING", "FK to agents"],
              ["feedback_type", "STRING", "thumbs_up | thumbs_down | correction | escalation"],
              ["feedback_text", "STRING", "Optional human comment"],
              ["corrected_output", "STRING", "What the right answer was"],
              ["reviewer_id", "STRING", "Human reviewer"],
              ["created_at", "TIMESTAMP", "Feedback timestamp"],
            ].map(([col, type, desc]) => (
              <tr key={col}><td className="col-name">{col}</td><td className="col-type">{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Training Pipeline ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">STEP 3: THE RETRAINING PIPELINE</span>
        <div className="divider-line" />
      </div>

      <p className="interstitial-text" style={{ marginBottom: 24 }}>
        A scheduled Databricks Job runs the full training pipeline — from feedback
        aggregation to model registration. MLflow tracks every experiment.
      </p>

      <div className="pipeline-flow">
        {[
          { icon: "📊", label: "Aggregate Feedback", desc: "Join interactions + feedback → training dataset", color: "#10b981" },
          { icon: "🔬", label: "Feature Engineering", desc: "Extract features from interaction logs → Feature Store", color: "#3b82f6" },
          { icon: "🧪", label: "MLflow Experiment", desc: "Train candidate model under agents/<agent_id>/<capability>", color: "#f59e0b" },
          { icon: "📋", label: "Evaluate", desc: "Compare to baseline on held-out test set + synthetic suites", color: "#8b5cf6" },
          { icon: "📦", label: "Register Model", desc: "If better → register new version in MLflow Model Registry", color: "#ef4444" },
          { icon: "🚀", label: "Stage Transition", desc: "Dev → Staging (for probation agents) or Staging → Production", color: "#ff3621" },
        ].map((step, i) => (
          <div key={step.label} className="pipeline-step">
            <div className="pipeline-icon" style={{ background: step.color + "20", color: step.color }}>
              {step.icon}
            </div>
            <div className="pipeline-content">
              <div className="pipeline-label">{step.label}</div>
              <div className="pipeline-desc">{step.desc}</div>
            </div>
            {i < 5 && <div className="pipeline-arrow">→</div>}
          </div>
        ))}
      </div>

      <div className="code-block" style={{ marginTop: 24 }}>
        <span className="cm">-- MLflow experiment naming convention</span><br />
        <span className="cm">-- agents/{"<agent_id>"}/{"<capability_name>"}</span><br /><br />
        <span className="cm"># Python: register new model version</span><br />
        <span className="kw">import</span> mlflow<br /><br />
        mlflow.<span className="fn">set_experiment</span>(<span className="str">"agents/health/anomaly_detection"</span>)<br /><br />
        <span className="kw">with</span> mlflow.<span className="fn">start_run</span>():<br />
        &nbsp;&nbsp;mlflow.<span className="fn">log_params</span>({"{"}<span className="str">"training_rows"</span>: <span className="fn">len</span>(train_df), <span className="str">"feedback_rows"</span>: <span className="fn">len</span>(feedback_df){"}"})<br />
        &nbsp;&nbsp;mlflow.<span className="fn">log_metrics</span>({"{"}<span className="str">"accuracy"</span>: 0.94, <span className="str">"f1"</span>: 0.91{"}"})<br />
        &nbsp;&nbsp;mlflow.<span className="fn">register_model</span>(<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"runs:/{"<run_id>"}/model"</span>,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"agents.health.anomaly_detection"</span><br />
        &nbsp;&nbsp;)<br /><br />
        <span className="cm"># Transition model stage based on agent lifecycle</span><br />
        client.<span className="fn">transition_model_version_stage</span>(<br />
        &nbsp;&nbsp;name=<span className="str">"agents.health.anomaly_detection"</span>,<br />
        &nbsp;&nbsp;version=<span className="str">"4"</span>,<br />
        &nbsp;&nbsp;stage=<span className="str">"Staging"</span> <span className="cm"># → "Production" after review passes</span><br />
        )
      </div>

      {/* ── Model Stage = Employee Level ── */}
      <div className="divider-section" style={{ marginTop: 48 }}>
        <div className="divider-line" />
        <span className="divider-label">MODEL STAGE = EMPLOYEE LEVEL</span>
        <div className="divider-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          {
            stage: "Dev", hr: "Intern / Trainee", desc: "Model is experimental. Agent uses it in sandbox only. No production data, no real users.", color: "#94a3b8",
          },
          {
            stage: "Staging", hr: "Probation Employee", desc: "Model passed initial tests. Agent gets limited production access with human-in-the-loop approval required.", color: "#f59e0b",
          },
          {
            stage: "Production", hr: "Full Employee", desc: "Model is validated. Agent operates autonomously within its granted scope. Performance is monitored continuously.", color: "#10b981",
          },
        ].map((s) => (
          <div key={s.stage} className="card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 4 }}>MLflow: {s.stage}</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>= {s.hr}</div>
            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="callout-box" style={{ marginTop: 32, background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}>
        <div className="callout-icon">✅</div>
        <div>
          <strong>What moves the agent forward:</strong> When a new model version
          outperforms the baseline on accuracy, latency, and cost metrics — and passes
          a compliance review — it transitions to <strong>Production</strong>, and the agent
          enters the regular <strong>Performance Review</strong> cycle.
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => nav("/performance")}>
          Next: Performance Reviews →
        </button>
        <button className="btn btn-secondary" onClick={() => nav("/onboarding")}>
          ← Back to Onboarding
        </button>
      </div>
    </div>
  );
}
