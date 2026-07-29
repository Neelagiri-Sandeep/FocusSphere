import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

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

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
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

const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconTrendingUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconFlag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="3" />
  </svg>
);

const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.59 2.59a2 2 0 0 0-1.42-.59H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.41l8 8a2 2 0 0 0 2.82 0l7.17-7.17a2 2 0 0 0 0-2.82z" />
    <circle cx="7" cy="7" r="1" />
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

function Dashboard() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  if (!token) {
    return <Navigate to="/login" />;
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/tasks", {
        headers: {
          Authorization: token,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();

    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (Notification.permission !== "granted") return;

    const today = new Date().toDateString();

    tasks.forEach((task) => {
      if (
        task.dueDate &&
        new Date(task.dueDate).toDateString() === today &&
        !task.completed
      ) {
        new Notification("📌 Task Reminder", {
          body: `${task.title} is due today!`,
        });
      }
    });
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTask = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/tasks",
        {
          title,
          description,
          category,
          priority,
          dueDate,
          dueTime,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTitle("");
      setDescription("");
      setCategory("Personal");
      setPriority("Medium");
      setDueDate("");
      setDueTime("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description || "");
    setCategory(task.category || "Personal");
    setPriority(task.priority || "Medium");
    setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : "");
    setDueTime(task.dueTime || "");

    setEditingId(task._id);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setCategory("Personal");
    setPriority("Medium");
    setDueDate("");
    setDueTime("");
    setEditingId(null);
    setIsEditing(false);
  };

  const updateTask = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/tasks/${editingId}`,
        {
          title,
          description,
          category,
          priority,
          dueDate,
          dueTime,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTitle("");
      setDescription("");
      setCategory("Personal");
      setPriority("Medium");
      setDueDate("");
      setDueTime("");

      setEditingId(null);
      setIsEditing(false);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/tasks/${task._id}`,
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

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const visibleTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) =>
      filterPriority === "All" ? true : task.priority === filterPriority
    )
    .filter((task) =>
      filterCategory === "All" ? true : task.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      if (sortBy === "High") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      if (sortBy === "Low") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return 0;
    });

  const priorityClass = (value) => {
    if (value === "High") return "badge-priority badge-priority--high";
    if (value === "Medium") return "badge-priority badge-priority--medium";
    return "badge-priority badge-priority--low";
  };

  return (
<main className={`dashboard ${darkMode ? "dark" : ""}`}>
        <div className="dashboard-layout">
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
          <header className="dashboard-header">
            <div className="dashboard-title">
              <h1>👋 Welcome, {userName}</h1>
              <p>
                {todayLabel} · Stay productive and achieve your goals today.
              </p>
            </div>

            <div className="header-actions">
            <button
  className="btn-profile"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>
              <button className="btn-profile" onClick={() => navigate("/profile")}>
                <IconProfile />
                <span>Profile</span>
              </button>

              <button className="btn-logout" onClick={handleLogout}>
                <IconLogout />
                <span>Logout</span>
              </button>
            </div>
          </header>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--total">
                <IconClipboard />
              </div>
              <div>
                <h2>{totalTasks}</h2>
                <p>Total Tasks</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--completed">
                <IconCheckCircle />
              </div>
              <div>
                <h2>{completedTasks}</h2>
                <p>Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--pending">
                <IconClock />
              </div>
              <div>
                <h2>{pendingTasks}</h2>
                <p>Pending</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon stat-card-icon--progress">
                <IconTrendingUp />
              </div>
              <div>
                <h2>{progressPercent}%</h2>
                <p>Progress</p>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="form-card">
              <h2>{isEditing ? "✏️ Edit Task" : "📝 Add New Task"}</h2>

              <div className="form-grid">
                <div className="full-width">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="full-width">
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <label className="field-label">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Personal</option>
                    <option>Study</option>
                    <option>Work</option>
                    <option>Health</option>
                  </select>
                </div>

                <div>
                  <label className="field-label">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="field-label">Due date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="field-label">Due time</label>
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                  />
                </div>

                <div className="full-width form-actions">
                  <button className="btn-primary" onClick={isEditing ? updateTask : addTask}>
                    <IconPlus />
                    <span>{isEditing ? "Update Task" : "Add Task"}</span>
                  </button>

                  {isEditing && (
                    <button className="btn-secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <hr className="divider" />

              <div className="filter-grid">
                <div className="full-width search-field">
                  <IconSearch />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="High">High Priority First</option>
                  <option value="Low">Low Priority First</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                  <option value="Work">Work</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div className="quick-actions">
                <button className="quick-action-card" onClick={() => navigate("/calendar")}>
                  <IconCalendar />
                  <span>Calendar</span>
                </button>

                <button className="quick-action-card" onClick={() => navigate("/notes")}>
                  <IconNotes />
                  <span>Notes</span>
                </button>

                <button className="quick-action-card" onClick={() => navigate("/pomodoro")}>
                  <IconPomodoro />
                  <span>Pomodoro</span>
                </button>
              </div>
            </div>

            <div className="task-section card">
              <h2>📋 Today's Tasks</h2>

              {visibleTasks.length === 0 && (
                <div className="empty-state">
                  <IconInbox />
                  <p>No tasks match your filters yet.</p>
                  <span>Add a task or adjust your search and filters.</span>
                </div>
              )}

              <div className="task-list">
                {visibleTasks.map((task) => (
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
                      <span className="badge-category">
                        <IconTag />
                        {task.category}
                      </span>

                      <span className={priorityClass(task.priority)}>
                        <IconFlag />
                        {task.priority}
                      </span>
                    </div>

                    <div className="task-meta">
                      <span className="task-meta-item">
                        <IconCalendar />
                        {task.dueDate ? task.dueDate.substring(0, 10) : "No date set"}
                      </span>

                      <span className="task-meta-item">
                        <IconClock />
                        {task.dueTime || "No time set"}
                      </span>
                    </div>

                    <div className="task-actions">
                      <button className="btn-edit" onClick={() => editTask(task)}>
                        <IconEdit />
                        <span>Edit</span>
                      </button>

                      <button className="btn-delete" onClick={() => deleteTask(task._id)}>
                        <IconTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
