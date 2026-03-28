import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MeetTheTeamPage from "./pages/MeetTheTeamPage";
import HiringPage from "./pages/HiringPage";
import OnboardingPage from "./pages/OnboardingPage";
import TrainingPage from "./pages/TrainingPage";
import PerformancePage from "./pages/PerformancePage";
import PromotionsPage from "./pages/PromotionsPage";
import OffboardingPage from "./pages/OffboardingPage";
import RiskPage from "./pages/RiskPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import "./index.css";

const LIFECYCLE_LINKS = [
  { to: "/hiring", label: "Hire", icon: "📋" },
  { to: "/onboarding", label: "Onboard", icon: "🪪" },
  { to: "/training", label: "Train", icon: "🎓" },
  { to: "/performance", label: "Review", icon: "📊" },
  { to: "/promotions", label: "Grow", icon: "🚀" },
  { to: "/offboarding", label: "Retire", icon: "📦" },
];

function LifecycleNav() {
  const location = useLocation();
  const isLifecyclePage = LIFECYCLE_LINKS.some((l) => location.pathname === l.to);
  if (!isLifecyclePage) return null;

  const currentIdx = LIFECYCLE_LINKS.findIndex((l) => l.to === location.pathname);

  return (
    <div className="lifecycle-nav">
      {LIFECYCLE_LINKS.map((l, i) => (
        <React.Fragment key={l.to}>
          <NavLink
            to={l.to}
            className={`lifecycle-step ${i <= currentIdx ? "completed" : ""} ${
              location.pathname === l.to ? "current" : ""
            }`}
          >
            <span className="lc-icon">{l.icon}</span>
            <span className="lc-label">{l.label}</span>
          </NavLink>
          {i < LIFECYCLE_LINKS.length - 1 && (
            <div className={`lifecycle-connector ${i < currentIdx ? "active" : ""}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="topnav">
          <div className="nav-brand">
            <span className="brand-icon">🛡️</span>
            <span className="brand-text">Agent HR</span>
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/team" onClick={() => setMenuOpen(false)}>Team</NavLink>
            <NavLink to="/hiring" onClick={() => setMenuOpen(false)}>Hire</NavLink>
            <NavLink to="/onboarding" onClick={() => setMenuOpen(false)}>Onboard</NavLink>
            <NavLink to="/training" onClick={() => setMenuOpen(false)}>Train</NavLink>
            <NavLink to="/performance" onClick={() => setMenuOpen(false)}>Review</NavLink>
            <NavLink to="/promotions" onClick={() => setMenuOpen(false)}>Grow</NavLink>
            <NavLink to="/offboarding" onClick={() => setMenuOpen(false)}>Retire</NavLink>
            <NavLink to="/risk" onClick={() => setMenuOpen(false)}>Risk</NavLink>
            <NavLink to="/architecture" onClick={() => setMenuOpen(false)}>Arch</NavLink>
          </div>
        </nav>
        <LifecycleNav />
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/team" element={<MeetTheTeamPage />} />
            <Route path="/hiring" element={<HiringPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/offboarding" element={<OffboardingPage />} />
            <Route path="/risk" element={<RiskPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
