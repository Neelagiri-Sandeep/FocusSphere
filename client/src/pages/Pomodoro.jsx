import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pomodoro.css";

/* ===========================================================
   Icon Set (inline SVG — no external icon library required)
=========================================================== */

const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconNotes = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconPomodoro = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" />
    <polyline points="12 9 12 13 15 15" />
    <line x1="9" y1="2" x2="15" y2="2" />
  </svg>
);

const IconProfile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const IconReset = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

const IconTomato = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 5c1-2 3-2.5 4-2" />
    <path d="M9 4c.5-1 1.5-1.5 2-1" />
  </svg>
);

const IconFire = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2s-6 5.5-6 11a6 6 0 0 0 12 0c0-2-1-3.5-2-4.5.2 1.3-.4 2-1 2.2C15.6 8.8 14 6.5 12 2Z" />
  </svg>
);

const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconActivity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconQuote = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M9 7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3v3l4-4V8a1 1 0 0 0-1-1H9zm11 0h-5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3v3l4-4V8a1 1 0 0 0-1-1z" />
  </svg>
);

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: IconDashboard },
  { path: "/calendar", label: "Calendar", icon: IconCalendar },
  { path: "/notes", label: "Notes", icon: IconNotes },
  { path: "/pomodoro", label: "Pomodoro", icon: IconPomodoro },
  { path: "/profile", label: "Profile", icon: IconProfile },
];

const QUOTES = [
  "Focus on being productive instead of busy.",
  "The secret of getting ahead is getting started.",
  "Small steps every day lead to big results.",
  "Discipline is choosing between what you want now and what you want most.",
  "Your future is created by what you do today, not tomorrow.",
  "Deep work is the superpower of the 21st century.",
  "One pomodoro at a time builds an unstoppable habit.",
  "Progress, not perfection, moves you forward.",
];

function Pomodoro() {
  const navigate = useNavigate();
  const location = useLocation();

  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [presetMinutes, setPresetMinutes] = useState(25);
  const [focusMinutes, setFocusMinutes] = useState(0);

  const quote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    []
  );

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setIsRunning(false);
      setSessions((prev) => prev + 1);
      setFocusMinutes((prev) => prev + presetMinutes);
      alert("🎉 Pomodoro Completed!");
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, presetMinutes]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const totalSeconds = presetMinutes * 60;
  const progress = totalSeconds === 0 ? 0 : (totalSeconds - seconds) / totalSeconds;

  const RADIUS = 130;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const statusLabel = isRunning ? "Focusing" : seconds === totalSeconds ? "Idle" : "Paused";
  const statusClass = isRunning
    ? "status-badge status-badge--running"
    : seconds === totalSeconds
    ? "status-badge status-badge--idle"
    : "status-badge status-badge--paused";

  const applyPreset = (mins) => {
    setIsRunning(false);
    setPresetMinutes(mins);
    setSeconds(mins * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(presetMinutes * 60);
  };

  return (
    <main className="pomodoro-page">
      <div className="pomodoro-layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h2>🚀 FocusSphere</h2>
            <p>Student Productivity</p>
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  className={`sidebar-link${isActive ? " sidebar-link--active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="sidebar-link-icon">
                    <ItemIcon />
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="main-content">
          <header className="pomodoro-header">
            <div className="pomodoro-title">
              <h1>🍅 Pomodoro Timer</h1>
              <p>One focused session at a time. You've got this.</p>
            </div>

            <div className="header-actions">
              <button className="btn-back" onClick={() => navigate("/dashboard")}>
                <IconArrowLeft />
                <span>Back to Dashboard</span>
              </button>

              <button className="btn-profile" onClick={() => navigate("/profile")}>
                <IconProfile />
                <span>Profile</span>
              </button>
            </div>
          </header>

          <div className="pomodoro-content">
            <div className="card timer-card">
              <span className={statusClass}>{statusLabel}</span>

              <div className="timer-ring-wrap">
                <svg className="timer-ring" viewBox="0 0 300 300">
                  <circle
                    className="timer-ring-track"
                    cx="150"
                    cy="150"
                    r={RADIUS}
                  />
                  <circle
                    className="timer-ring-progress"
                    cx="150"
                    cy="150"
                    r={RADIUS}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                  />
                </svg>

                <div className="timer-center">
                  <span className="timer-time">
                    {String(minutes).padStart(2, "0")}:
                    {String(secs).padStart(2, "0")}
                  </span>
                  <span className="timer-label">{presetMinutes} min session</span>
                </div>
              </div>

              <div className="timer-controls">
                <button className="btn-control btn-control--start" onClick={() => setIsRunning(true)}>
                  <IconPlay />
                  <span>Start</span>
                </button>

                <button className="btn-control btn-control--pause" onClick={() => setIsRunning(false)}>
                  <IconPause />
                  <span>Pause</span>
                </button>

                <button className="btn-control btn-control--reset" onClick={resetTimer}>
                  <IconReset />
                  <span>Reset</span>
                </button>
              </div>

              <div className="preset-cards">
                <button
                  className={`preset-card${presetMinutes === 25 ? " preset-card--active" : ""}`}
                  onClick={() => applyPreset(25)}
                >
                  <IconTomato />
                  <span>25 Minutes</span>
                  <span className="preset-caption">Classic focus block</span>
                </button>

                <button
                  className={`preset-card${presetMinutes === 50 ? " preset-card--active" : ""}`}
                  onClick={() => applyPreset(50)}
                >
                  <IconFire />
                  <span>50 Minutes</span>
                  <span className="preset-caption">Deep work session</span>
                </button>
              </div>
            </div>

            <div className="side-column">
              <div className="card stats-card">
                <h2>Session Stats</h2>

                <div className="stat-row">
                  <div className="stat-row-icon stat-row-icon--sessions">
                    <IconCheckCircle />
                  </div>
                  <div>
                    <h3>{sessions}</h3>
                    <p>Completed Sessions</p>
                  </div>
                </div>

                <div className="stat-row">
                  <div className="stat-row-icon stat-row-icon--status">
                    <IconActivity />
                  </div>
                  <div>
                    <h3>{statusLabel}</h3>
                    <p>Current Status</p>
                  </div>
                </div>

                <div className="stat-row">
                  <div className="stat-row-icon stat-row-icon--focus">
                    <IconClock />
                  </div>
                  <div>
                    <h3>{focusMinutes} min</h3>
                    <p>Focus Time</p>
                  </div>
                </div>
              </div>

              <div className="card quote-card">
                <IconQuote />
                <p>{quote}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Pomodoro;