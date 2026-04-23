import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import "../styles.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

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
      await API.post("/tasks", { title: title.trim() });
      setTitle("");
      fetchTasks();
    } catch (e) {
      setError(e?.response?.data?.message || "Could not add task.");
    }
  };

  const deleteTask = async (id) => {
    setError("");
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (e) {
      setError(e?.response?.data?.message || "Could not delete task.");
    }
  };

  return (
    <div className="app-shell">
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
            <button className="btn btn-primary" onClick={addTask}>
              Add
            </button>
          </div>

          {error ? <div className="error">{error}</div> : null}

          <ul className="task-list">
            {tasks.map((t) => (
              <li className="task-item" key={t._id}>
                <div className="task-title">{t.title}</div>
                <button className="btn btn-danger" onClick={() => deleteTask(t._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}