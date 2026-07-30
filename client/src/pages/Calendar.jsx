import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Calendar.css";

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

const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.59 2.59a2 2 0 0 0-1.42-.59H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.41l8 8a2 2 0 0 0 2.82 0l7.17-7.17a2 2 0 0 0 0-2.82z" />
    <circle cx="7" cy="7" r="1" />
  </svg>
);

const IconFlag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconInbox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: IconDashboard },
  { path: "/calendar", label: "Calendar", icon: IconCalendar },
  { path: "/notes", label: "Notes", icon: IconNotes },
  { path: "/pomodoro", label: "Pomodoro", icon: IconPomodoro },
  { path: "/profile", label: "Profile", icon: IconProfile },
];

function CalendarPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
const response = await axios.get("https://focussphere-uppl.onrender.com/tasks", {
          headers: {
          Authorization: token,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(
        `https://focussphere-uppl.onrender.com/tasks/${task._id}`,
        {
          ...task,
          completed: !task.completed,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const selectedTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    return new Date(task.dueDate).toDateString() === date.toDateString();
  });

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const selectedDateLabel = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const priorityClass = (value) => {
    if (value === "High") return "badge-priority badge-priority--high";
    if (value === "Medium") return "badge-priority badge-priority--medium";
    return "badge-priority badge-priority--low";
  };

  return (
    <main className="calendar-page">
      <div className="calendar-layout">
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
          <header className="calendar-header">
            <div className="calendar-title">
              <h1>📅 Task Calendar{userName ? `, ${userName}` : ""}</h1>
              <p>{todayLabel} · Keep track of every deadline.</p>
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

          <div className="calendar-content">
            <div className="card calendar-card">
              <h2>Your Schedule</h2>

              <Calendar
                onChange={setDate}
                value={date}
                next2Label={null}
                prev2Label={null}
                tileClassName={({ date: tileDate }) => {
                  const hasTask = tasks.some(
                    (task) =>
                      task.dueDate &&
                      new Date(task.dueDate).toDateString() ===
                        tileDate.toDateString()
                  );

                  return hasTask ? "task-date" : null;
                }}
                tileContent={({ date: tileDate }) => {
                  const hasTask = tasks.some(
                    (task) =>
                      task.dueDate &&
                      new Date(task.dueDate).toDateString() ===
                        tileDate.toDateString()
                  );

                  return hasTask ? <span className="task-dot"></span> : null;
                }}
              />

              <div className="calendar-legend">
                <span className="legend-item">
                  <span className="legend-dot legend-dot--task"></span>
                  Has tasks
                </span>
                <span className="legend-item">
                  <span className="legend-dot legend-dot--today"></span>
                  Today
                </span>
                <span className="legend-item">
                  <span className="legend-dot legend-dot--selected"></span>
                  Selected
                </span>
              </div>
            </div>

            <div className="card tasks-card">
              <div className="tasks-card-header">
                <h2>Tasks for this Date</h2>
                <p className="selected-date-label">{selectedDateLabel}</p>
              </div>

              {selectedTasks.length === 0 ? (
                <div className="empty-state">
                  <IconInbox />
                  <p>No tasks scheduled.</p>
                  <span>Enjoy the free time or add a task from your dashboard.</span>
                </div>
              ) : (
                <div className="task-list">
                  {selectedTasks.map((task) => (
                    <div
                      key={task._id}
                      className={`task-card${task.completed ? " task-card--completed" : ""}`}
                    >
                      <div className="task-card-top">
                        <label className="task-checkbox">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task)}
                          />
                          <span className="checkmark"></span>
                        </label>

                        <h3 className="task-title">{task.title}</h3>

                        {task.completed && (
                          <span className="badge-completed">Completed</span>
                        )}
                      </div>

                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}

                      <div className="task-badges">
                        {task.category && (
                          <span className="badge-category">
                            <IconTag />
                            {task.category}
                          </span>
                        )}

                        <span className={priorityClass(task.priority)}>
                          <IconFlag />
                          {task.priority}
                        </span>
                      </div>

                      <div className="task-meta">
                        <span className="task-meta-item">
                          <IconClock />
                          {task.dueTime || "No time set"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CalendarPage;