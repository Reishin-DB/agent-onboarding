import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MeetTheTeamPage from "./pages/MeetTheTeamPage";
import OnboardingPage from "./pages/OnboardingPage";
import GovernancePage from "./pages/GovernancePage";
import ArchitecturePage from "./pages/ArchitecturePage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="topnav">
          <div className="nav-brand">
            <span className="brand-icon">🛡️</span>
            <span className="brand-text">Agent Onboarding</span>
          </div>
          <div className="nav-links">
            <NavLink to="/" end>Welcome</NavLink>
            <NavLink to="/team">Meet the Team</NavLink>
            <NavLink to="/onboarding">Day 1</NavLink>
            <NavLink to="/governance">Governance</NavLink>
            <NavLink to="/architecture">Architecture</NavLink>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/team" element={<MeetTheTeamPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/governance" element={<GovernancePage />} />
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
