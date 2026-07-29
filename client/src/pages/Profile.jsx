import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

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

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

const IconBadge = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.4 20.4 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.32 20.32 0 0 1-3.22 4.44" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconClipboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="13" y2="16" />
  </svg>
);

const IconFileText = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconTrendingUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: IconDashboard },
  { path: "/calendar", label: "Calendar", icon: IconCalendar },
  { path: "/notes", label: "Notes", icon: IconNotes },
  { path: "/pomodoro", label: "Pomodoro", icon: IconPomodoro },
  { path: "/profile", label: "Profile", icon: IconProfile },
];

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const [name, setName] = useState(localStorage.getItem("name"));
  const email = localStorage.getItem("email");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);

  useEffect(() => {
    fetchQuickStats();
  }, []);

  const fetchQuickStats = async () => {
    try {
      const [tasksResponse, notesResponse] = await Promise.all([
        axios.get("http://127.0.0.1:5000/tasks", {
          headers: { Authorization: token },
        }),
        axios.get("http://127.0.0.1:5000/notes", {
          headers: { Authorization: token },
        }),
      ]);

      setTotalTasks(tasksResponse.data.length);
      setCompletedTasks(
        tasksResponse.data.filter((task) => task.completed).length
      );
      setTotalNotes(notesResponse.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const productivityScore =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const updateProfile = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:5000/profile",
        {
          name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      localStorage.setItem("name", response.data.user.name);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:5000/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(response.data.message);

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Error changing password");
    }
  };

  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <main className="profile-page">
      <div className="profile-layout">
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
          <header className="profile-header">
            <div className="profile-title">
              <h1>👤 My Profile</h1>
              <p>Manage your account details and preferences.</p>
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

          <div className="profile-hero card">
            <div className="avatar">{initial}</div>

            <div className="profile-hero-info">
              <h2>{name || "Unnamed User"}</h2>

              <span className="hero-email">
                <IconMail />
                {email}
              </span>

              <span className="member-badge">
                <IconBadge />
                FocusSphere Member
              </span>
            </div>
          </div>

          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--total">
                <IconClipboard />
              </div>
              <div>
                <h3>{totalTasks}</h3>
                <p>Total Tasks</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--notes">
                <IconFileText />
              </div>
              <div>
                <h3>{totalNotes}</h3>
                <p>Notes</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--sessions">
                <IconCheckCircle />
              </div>
              <div>
                <h3>{completedTasks}</h3>
                <p>Completed Tasks</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--score">
                <IconTrendingUp />
              </div>
              <div>
                <h3>{productivityScore}%</h3>
                <p>Productivity Score</p>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="card info-card">
              <h2>Personal Information</h2>

              <div className="field-group">
                <label className="field-label">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Email</label>
                <input type="text" value={email || ""} readOnly disabled />
              </div>

              <button className="btn-primary" onClick={updateProfile}>
                <IconSave />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="card security-card">
              <h2>Security</h2>

              <div className="field-group">
                <label className="field-label">Current Password</label>
                <div className="password-field">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                  >
                    {showCurrentPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">New Password</label>
                <div className="password-field">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              <button className="btn-secondary-action" onClick={changePassword}>
                <IconLock />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;