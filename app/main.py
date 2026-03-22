"""Agent Onboarding — Governance for AI.

Minimal FastAPI backend serving the React storytelling app.
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Agent Onboarding", version="1.0.0")

# ── API routes ──────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/agents")
async def get_agents():
    """Return the 5 BOP agent personas with their governance metadata."""
    return [
        {
            "id": "health",
            "name": "HEALTH",
            "title": "Field Technician",
            "avatar": "🩺",
            "color": "#ef4444",
            "mission": "Monitor component anomalies and health scores in real-time",
            "reads": ["sensor_telemetry", "component_catalog", "failure_patterns"],
            "writes": ["recommendations"],
            "uc_grants": ["SELECT on sensors.bronze.telemetry", "SELECT on ref.failure_patterns"],
            "denied": ["work_orders", "crew_roster", "sap_inventory"],
            "risk_level": "high",
            "certification": "BOP_MAINT_LEVEL_II",
        },
        {
            "id": "maintenance",
            "name": "MAINTENANCE",
            "title": "Maintenance Planner",
            "avatar": "🔧",
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
        },
        {
            "id": "supply_chain",
            "name": "SUPPLY CHAIN",
            "title": "Procurement Specialist",
            "avatar": "📦",
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
        },
        {
            "id": "crew",
            "name": "CREW",
            "title": "Shift Supervisor",
            "avatar": "👷",
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
        },
        {
            "id": "drilling",
            "name": "DRILLING",
            "title": "Operations Engineer",
            "avatar": "⛽",
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
        },
    ]


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
