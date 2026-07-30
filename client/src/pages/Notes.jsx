import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Notes.css";

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

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
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

const CONTENT_LIMIT = 2000;

function Notes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const userName = localStorage.getItem("name");

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("https://focussphere-uppl.onrender.com/notes", {
        headers: {
          Authorization: token,
        },
      });

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addOrUpdateNote = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(
          `https://focussphere-uppl.onrender.com/notes/${editingId}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setEditingId(null);
      } else {
        await axios.post(
          "https://focussphere-uppl.onrender.com/notes",
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://focussphere-uppl.onrender.com/notes/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const formatDate = (value) => {
    if (!value) return "Not saved yet";

    return new Date(value).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const visibleNotes = notes.filter((note) => {
    const query = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(query) ||
      (note.content || "").toLowerCase().includes(query)
    );
  });

  return (
    <main className="notes-page">
      <div className="notes-layout">
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
          <header className="notes-header">
            <div className="notes-title">
              <h1>📝 Notes{userName ? `, ${userName}` : ""}</h1>
              <p>Capture ideas, lectures, and reminders in one place.</p>
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

          <div className="notes-content">
            <div className="card editor-card">
              <h2>{editingId ? "✏️ Edit Note" : "🖊️ New Note"}</h2>

              <div className="editor-field">
                <label className="field-label">Title</label>
                <input
                  type="text"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="editor-field">
                <label className="field-label">Content</label>
                <textarea
                  placeholder="Enter note content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={CONTENT_LIMIT}
                ></textarea>
                <div className="char-counter">
                  {content.length} / {CONTENT_LIMIT}
                </div>
              </div>

              <div className="editor-actions">
                <button className="btn-primary" onClick={addOrUpdateNote}>
                  <IconPlus />
                  <span>{editingId ? "Update Note" : "Add Note"}</span>
                </button>

                {editingId && (
                  <button className="btn-secondary" onClick={cancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="card notes-list-card">
              <div className="notes-list-header">
                <h2>Your Notes</h2>

                <div className="search-field">
                  <IconSearch />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {visibleNotes.length === 0 ? (
                <div className="empty-state">
                  <IconInbox />
                  <p>No notes yet.</p>
                  <span>
                    {notes.length === 0
                      ? "Write your first note using the editor on the left."
                      : "No notes match your search."}
                  </span>
                </div>
              ) : (
                <div className="notes-grid">
                  {visibleNotes.map((note) => (
                    <div key={note._id} className="note-card">
                      <h3 className="note-title">{note.title}</h3>

                      <p className="note-preview">{note.content}</p>

                      <div className="note-meta">
                        <IconClock />
                        <span>{formatDate(note.updatedAt || note.createdAt)}</span>
                      </div>

                      <div className="note-actions">
                        <button className="btn-edit" onClick={() => editNote(note)}>
                          <IconEdit />
                          <span>Edit</span>
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() => deleteNote(note._id)}
                        >
                          <IconTrash />
                          <span>Delete</span>
                        </button>
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

export default Notes;