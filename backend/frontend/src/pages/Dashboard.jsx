import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import "../styles.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", variant: "success" });

  const showToast = (message, variant = "success") => {
    setToast({ open: true, message, variant });
  };

  const fetchTasks = async () => {
    setError("");
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Could not load tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    setError("");
    try {
      await API.post("/tasks", { title: title.trim(), status });
      setTitle("");
      setStatus("pending");
      fetchTasks();
      showToast("Task added successfully", "success");
    } catch (e) {
      setError(e?.response?.data?.message || "Could not add task.");
    }
  };

  const toggleStatus = async (task) => {
    setError("");
    const next = task.status === "completed" ? "pending" : "completed";
    try {
      await API.put(`/tasks/${task._id}`, { status: next });
      fetchTasks();
      showToast(
        next === "completed" ? "Task marked completed" : "Task moved to pending",
        "success"
      );
    } catch (e) {
      setError(e?.response?.data?.message || "Could not update task.");
    }
  };

  const deleteTask = async (id) => {
    setError("");
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      showToast("Task deleted successfully", "error");
    } catch (e) {
      setError(e?.response?.data?.message || "Could not delete task.");
    }
  };

  return (
    <div className="app-shell">
      <Toast
        open={toast.open}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
      <Navbar />
      <div className="content">
        <div className="panel">
          <h2 className="panel-title">My Tasks</h2>

          <div className="task-box">
            <input
              className="input"
              value={title}
              placeholder="Add a new task..."
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />
            <select
              className="input select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Task status"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button className="btn btn-primary" onClick={addTask}>
              Add
            </button>
          </div>

          {error ? <div className="error">{error}</div> : null}

          <ul className="task-list">
            {tasks.map((t) => (
              <li className="task-item" key={t._id}>
                <div className="task-left">
                  <div className="task-title">{t.title}</div>
                  <div className={`badge badge-${t.status}`}>{t.status}</div>
                </div>
                <div className="task-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => toggleStatus(t)}>
                    {t.status === "completed" ? "Mark pending" : "Mark done"}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(t._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}