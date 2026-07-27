import { motion } from "motion/react";
import { LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import BackgroundScene from "./BackgroundScene.jsx";
import Logo from "./Logo.jsx";

export default function AuthLayout({ eyebrow, title, description, children }) {
  return (
    <main className="auth-page">
      <BackgroundScene />

      <section className="auth-shell">
        <motion.div
          className="story-panel"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <Logo />
          <div className="story-copy">
            <span className="eyebrow">SECURE BY DESIGN</span>
            <h1>Authentication that feels invisible.</h1>
            <p>
              Short-lived access. Durable sessions. A deliberately small security
              surface built for the modern web.
            </p>

            <div className="feature-row">
              <div><ShieldCheck size={18} /><span>Protected routes</span></div>
              <div><RefreshCw size={18} /><span>Silent refresh</span></div>
              <div><LockKeyhole size={18} /><span>HttpOnly session</span></div>
            </div>
          </div>

          <p className="micro-copy">MERN / JWT / TWO-TOKEN ARCHITECTURE</p>
        </motion.div>

        <motion.section
          className="auth-card-wrap"
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className="auth-card">
            <div className="mobile-logo"><Logo /></div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p className="card-description">{description}</p>
            {children}
          </div>
        </motion.section>
      </section>
    </main>
  );
}
