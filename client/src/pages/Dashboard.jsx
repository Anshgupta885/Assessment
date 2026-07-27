import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Clock3,
  Fingerprint,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const cards = [
  { label: "Session", value: "Active", detail: "Refresh session available", icon: ShieldCheck },
  { label: "Access layer", value: "JWT", detail: "Short-lived bearer token", icon: Fingerprint },
  { label: "Renewal", value: "Silent", detail: "Automatic token refresh", icon: RefreshCw },
];

export default function Dashboard() {
  const { user, logout, privateApi } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    privateApi.get("/user/me").then(({ data }) => setProfile(data.user)).catch(() => {});
  }, [privateApi]);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-grid" />
      <nav className="dashboard-nav">
        <Logo />
        <div className="nav-actions">
          <span className="status-pill"><i /> SESSION ACTIVE</span>
          <button className="ghost-button" onClick={signOut}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </nav>

      <section className="dashboard-content">
        <motion.header
          className="dashboard-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="eyebrow">SECURE CONSOLE</span>
          <h1>Good to see you, {profile?.name?.split(" ")[0]}.</h1>
          <p>Your authenticated session is live and protected by a two-token flow.</p>
        </motion.header>

        <div className="metric-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                className="metric-card"
                key={card.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index }}
                whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
              >
                <div className="metric-top">
                  <span>{card.label}</span>
                  <Icon size={19} />
                </div>
                <strong>{card.value}</strong>
                <p>{card.detail}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.section
          className="session-panel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="panel-heading">
            <div>
              <span className="eyebrow">IDENTITY</span>
              <h2>Session details</h2>
            </div>
            <span className="panel-icon"><Clock3 size={20} /></span>
          </div>

          <div className="detail-row"><span>Name</span><strong>{profile?.name}</strong></div>
          <div className="detail-row"><span>Email</span><strong>{profile?.email}</strong></div>
          <div className="detail-row"><span>Authentication</span><strong>JWT + HttpOnly refresh</strong></div>
          <div className="detail-row">
            <span>Account created</span>
            <strong>{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Current session"}</strong>
          </div>

          <div className="architecture-note">
            <ShieldCheck size={20} />
            <div>
              <strong>Refresh token stays outside JavaScript.</strong>
              <p>The browser exchanges the HttpOnly cookie for a new short-lived access token when required.</p>
            </div>
            <ArrowUpRight size={18} />
          </div>
        </motion.section>
      </section>
    </main>
  );
}
