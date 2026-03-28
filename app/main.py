"""Agent Onboarding — Governance for AI.

FastAPI backend serving the React storytelling app with full agent lifecycle data.
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Agent Onboarding", version="2.0.0")

# ── Agent data ───────────────────────────────────────────────

AGENTS = [
    {
        "id": "health",
        "name": "HEALTH",
        "title": "Field Technician",
        "avatar": "\U0001fa7a",
        "color": "#ef4444",
        "mission": "Monitor component anomalies and health scores in real-time",
        "reads": ["sensor_telemetry", "component_catalog", "failure_patterns"],
        "writes": ["recommendations"],
        "uc_grants": ["SELECT on sensors.bronze.telemetry", "SELECT on ref.failure_patterns"],
        "denied": ["work_orders", "crew_roster", "sap_inventory"],
        "risk_level": "high",
        "certification": "BOP_MAINT_LEVEL_II",
        "lifecycle_stage": "production",
        "hire_date": "2024-01-15",
        "department": "operations",
        "performance_score": 94,
        "actions_logged": 12847,
        "violations": 0,
        "model_version": "v3.2.1",
        "model_stage": "Production",
    },
    {
        "id": "maintenance",
        "name": "MAINTENANCE",
        "title": "Maintenance Planner",
        "avatar": "\U0001f527",
        "color": "#f59e0b",
        "mission": "Analyze RUL predictions and generate preventive maintenance work orders",
        "reads": ["rul_predictions", "sap_work_orders", "component_health"],
        "writes": ["work_orders", "recommendations"],
        "uc_grants": [
            "SELECT on analytics.silver.rul_predictions",
            "SELECT on sap.work_orders",
            "INSERT on ops.gold.maintenance_orders",
        ],
        "denied": ["crew_roster", "drilling_params", "cost_data"],
        "risk_level": "high",
        "certification": "BOP_MAINT_LEVEL_III",
        "lifecycle_stage": "production",
        "hire_date": "2024-01-15",
        "department": "maintenance",
        "performance_score": 91,
        "actions_logged": 8432,
        "violations": 1,
        "model_version": "v2.8.0",
        "model_stage": "Production",
    },
    {
        "id": "supply_chain",
        "name": "SUPPLY CHAIN",
        "title": "Procurement Specialist",
        "avatar": "\U0001f4e6",
        "color": "#3b82f6",
        "mission": "Monitor spare parts inventory and trigger emergency orders",
        "reads": ["sap_spares_inventory", "component_anomalies", "supplier_catalog"],
        "writes": ["purchase_orders", "recommendations"],
        "uc_grants": [
            "SELECT on sap.inventory.spares",
            "SELECT on sensors.bronze.anomalies",
            "INSERT on procurement.gold.orders",
        ],
        "denied": ["crew_roster", "drilling_params", "rul_predictions"],
        "risk_level": "medium",
        "certification": "SUPPLY_CHAIN_CERTIFIED",
        "lifecycle_stage": "training",
        "hire_date": "2024-06-01",
        "department": "procurement",
        "performance_score": 78,
        "actions_logged": 3210,
        "violations": 0,
        "model_version": "v1.4.0",
        "model_stage": "Staging",
    },
    {
        "id": "crew",
        "name": "CREW",
        "title": "Shift Supervisor",
        "avatar": "\U0001f477",
        "color": "#10b981",
        "mission": "Manage crew assignments, certifications, and response times",
        "reads": ["crew_roster", "certification_map", "intervention_eta"],
        "writes": ["crew_assignments", "recommendations"],
        "uc_grants": [
            "SELECT on ops.gold.crew_roster",
            "SELECT on ref.certification_map",
            "INSERT on ops.gold.crew_assignments",
        ],
        "denied": ["sap_inventory", "cost_data", "rul_predictions"],
        "risk_level": "medium",
        "certification": "CREW_MANAGEMENT",
        "lifecycle_stage": "production",
        "hire_date": "2024-02-01",
        "department": "operations",
        "performance_score": 88,
        "actions_logged": 6521,
        "violations": 0,
        "model_version": "v2.1.0",
        "model_stage": "Production",
    },
    {
        "id": "drilling",
        "name": "DRILLING",
        "title": "Operations Engineer",
        "avatar": "\u26fd",
        "color": "#8b5cf6",
        "mission": "Assess operational risk and trigger well-control escalations",
        "reads": ["drilling_operations", "component_status", "bsr_state"],
        "writes": ["escalations", "recommendations"],
        "uc_grants": [
            "SELECT on ops.gold.drilling_operations",
            "SELECT on sensors.bronze.telemetry",
        ],
        "denied": ["crew_roster", "sap_inventory", "work_orders", "cost_data"],
        "risk_level": "critical",
        "certification": "WELL_CONTROL_LEVEL_IV",
        "lifecycle_stage": "probation",
        "hire_date": "2024-09-01",
        "department": "drilling",
        "performance_score": 72,
        "actions_logged": 1893,
        "violations": 2,
        "model_version": "v1.0.0",
        "model_stage": "Staging",
    },
]


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/agents")
async def get_agents():
    return AGENTS


@app.get("/api/lifecycle/schemas")
async def get_schemas():
    """Return the HR-layer table schemas for the lifecycle system."""
    return {
        "agent_role_templates": {
            "description": "Defines available agent roles — like job descriptions for AI",
            "columns": [
                {"name": "role_id", "type": "STRING", "desc": "Unique role identifier"},
                {"name": "role_name", "type": "STRING", "desc": "Human-readable role name"},
                {"name": "department", "type": "STRING", "desc": "Owning department"},
                {"name": "risk_level", "type": "STRING", "desc": "low | medium | high | critical"},
                {"name": "required_certification", "type": "STRING", "desc": "Required cert before production"},
                {"name": "allowed_tools", "type": "ARRAY<STRING>", "desc": "UC functions this role can invoke"},
                {"name": "data_domains", "type": "ARRAY<STRING>", "desc": "Catalogs/schemas accessible"},
                {"name": "max_compute_tier", "type": "STRING", "desc": "Cluster policy limit"},
                {"name": "approval_chain", "type": "ARRAY<STRING>", "desc": "Required approvers"},
                {"name": "created_at", "type": "TIMESTAMP", "desc": "Template creation date"},
            ],
        },
        "agent_requisitions": {
            "description": "Tracks requests to create new agents — like job requisitions",
            "columns": [
                {"name": "requisition_id", "type": "STRING", "desc": "Unique req ID"},
                {"name": "role_id", "type": "STRING", "desc": "FK to role_templates"},
                {"name": "requested_by", "type": "STRING", "desc": "Human requestor"},
                {"name": "business_justification", "type": "STRING", "desc": "Why this agent is needed"},
                {"name": "scope_description", "type": "STRING", "desc": "What the agent will do"},
                {"name": "status", "type": "STRING", "desc": "pending | approved | rejected | provisioned"},
                {"name": "approved_by", "type": "STRING", "desc": "Approver identity"},
                {"name": "approved_at", "type": "TIMESTAMP", "desc": "Approval timestamp"},
                {"name": "service_principal_id", "type": "STRING", "desc": "Created SP (after approval)"},
                {"name": "created_at", "type": "TIMESTAMP", "desc": "Requisition date"},
            ],
        },
        "agents": {
            "description": "Master agent registry — the employee directory for AI",
            "columns": [
                {"name": "agent_id", "type": "STRING", "desc": "Unique agent identifier"},
                {"name": "agent_name", "type": "STRING", "desc": "Human-readable name"},
                {"name": "service_principal_id", "type": "STRING", "desc": "UC service principal"},
                {"name": "role_id", "type": "STRING", "desc": "FK to role_templates"},
                {"name": "department", "type": "STRING", "desc": "Current department"},
                {"name": "lifecycle_stage", "type": "STRING", "desc": "probation | training | production | coaching | archived"},
                {"name": "hire_date", "type": "DATE", "desc": "When the agent was provisioned"},
                {"name": "current_model_version", "type": "STRING", "desc": "Active model in MLflow Registry"},
                {"name": "model_stage", "type": "STRING", "desc": "Staging | Production | Archived"},
                {"name": "manager_principal", "type": "STRING", "desc": "Human owner / manager"},
                {"name": "last_review_date", "type": "DATE", "desc": "Last performance review"},
                {"name": "next_review_date", "type": "DATE", "desc": "Scheduled next review"},
                {"name": "is_active", "type": "BOOLEAN", "desc": "Whether agent is currently active"},
            ],
        },
        "agent_onboarding_events": {
            "description": "Tracks each step of the onboarding checklist",
            "columns": [
                {"name": "event_id", "type": "STRING", "desc": "Unique event ID"},
                {"name": "agent_id", "type": "STRING", "desc": "FK to agents"},
                {"name": "event_type", "type": "STRING", "desc": "sp_created | grants_applied | sandbox_assigned | probation_started | probation_passed"},
                {"name": "event_data", "type": "MAP<STRING,STRING>", "desc": "Event-specific metadata"},
                {"name": "completed_by", "type": "STRING", "desc": "Who/what completed this step"},
                {"name": "event_time", "type": "TIMESTAMP", "desc": "When event occurred"},
            ],
        },
        "agent_interactions": {
            "description": "Every action the agent takes — the activity log",
            "columns": [
                {"name": "interaction_id", "type": "STRING", "desc": "Unique interaction ID"},
                {"name": "agent_id", "type": "STRING", "desc": "FK to agents"},
                {"name": "interaction_type", "type": "STRING", "desc": "query | recommendation | escalation | tool_call"},
                {"name": "input_summary", "type": "STRING", "desc": "What triggered this action"},
                {"name": "output_summary", "type": "STRING", "desc": "What the agent produced"},
                {"name": "tables_accessed", "type": "ARRAY<STRING>", "desc": "Tables read during this action"},
                {"name": "model_version", "type": "STRING", "desc": "Model version used"},
                {"name": "latency_ms", "type": "INT", "desc": "Processing time"},
                {"name": "token_count", "type": "INT", "desc": "Tokens consumed (if LLM-based)"},
                {"name": "user_id", "type": "STRING", "desc": "Human user who triggered the action"},
                {"name": "created_at", "type": "TIMESTAMP", "desc": "Interaction timestamp"},
            ],
        },
        "agent_feedback": {
            "description": "Human feedback on agent actions — the coaching notes",
            "columns": [
                {"name": "feedback_id", "type": "STRING", "desc": "Unique feedback ID"},
                {"name": "interaction_id", "type": "STRING", "desc": "FK to interactions"},
                {"name": "agent_id", "type": "STRING", "desc": "FK to agents"},
                {"name": "feedback_type", "type": "STRING", "desc": "thumbs_up | thumbs_down | correction | escalation"},
                {"name": "feedback_text", "type": "STRING", "desc": "Optional human comment"},
                {"name": "corrected_output", "type": "STRING", "desc": "What the right answer was"},
                {"name": "reviewer_id", "type": "STRING", "desc": "Human reviewer"},
                {"name": "created_at", "type": "TIMESTAMP", "desc": "Feedback timestamp"},
            ],
        },
        "agent_performance_snapshots": {
            "description": "Periodic performance reviews — the quarterly evaluation",
            "columns": [
                {"name": "snapshot_id", "type": "STRING", "desc": "Unique snapshot ID"},
                {"name": "agent_id", "type": "STRING", "desc": "FK to agents"},
                {"name": "review_period_start", "type": "DATE", "desc": "Review window start"},
                {"name": "review_period_end", "type": "DATE", "desc": "Review window end"},
                {"name": "accuracy_score", "type": "DOUBLE", "desc": "% correct actions"},
                {"name": "latency_p50_ms", "type": "INT", "desc": "Median response time"},
                {"name": "latency_p99_ms", "type": "INT", "desc": "99th percentile response time"},
                {"name": "cost_per_action_usd", "type": "DOUBLE", "desc": "Average cost per action"},
                {"name": "violation_count", "type": "INT", "desc": "Policy violations in period"},
                {"name": "user_satisfaction", "type": "DOUBLE", "desc": "Avg user rating (1-5)"},
                {"name": "actions_total", "type": "INT", "desc": "Total actions in period"},
                {"name": "model_version", "type": "STRING", "desc": "Model used during period"},
                {"name": "recommendation", "type": "STRING", "desc": "promote | maintain | coach | freeze | retire"},
                {"name": "reviewer_id", "type": "STRING", "desc": "Human reviewer"},
                {"name": "created_at", "type": "TIMESTAMP", "desc": "Snapshot timestamp"},
            ],
        },
        "agent_lifecycle_events": {
            "description": "Every lifecycle transition — the HR change log",
            "columns": [
                {"name": "event_id", "type": "STRING", "desc": "Unique event ID"},
                {"name": "agent_id", "type": "STRING", "desc": "FK to agents"},
                {"name": "event_type", "type": "STRING", "desc": "hired | promoted | lateral_move | coached | frozen | retired | rehired"},
                {"name": "from_stage", "type": "STRING", "desc": "Previous lifecycle stage"},
                {"name": "to_stage", "type": "STRING", "desc": "New lifecycle stage"},
                {"name": "from_role", "type": "STRING", "desc": "Previous role (for lateral moves)"},
                {"name": "to_role", "type": "STRING", "desc": "New role (for lateral moves)"},
                {"name": "reason", "type": "STRING", "desc": "Business justification"},
                {"name": "grants_changed", "type": "ARRAY<STRING>", "desc": "UC grants added/removed"},
                {"name": "model_version_change", "type": "STRING", "desc": "Model version transition"},
                {"name": "approved_by", "type": "STRING", "desc": "Approver"},
                {"name": "is_reversible", "type": "BOOLEAN", "desc": "Can this be rolled back?"},
                {"name": "event_time", "type": "TIMESTAMP", "desc": "When it happened"},
            ],
        },
    }


# ── Static files (built React app) ─────────────────────────

static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.isdir(os.path.join(static_dir, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    """Serve React SPA for all non-API routes."""
    index = os.path.join(static_dir, "index.html")
    if os.path.exists(index):
        return FileResponse(index)
    return {"message": "Build the frontend first: cd app/frontend && npm run build"}
