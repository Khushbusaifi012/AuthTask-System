import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import "../styles.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>My Tasks</h2>

        <div className="task-box">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t._id}>
              {t.title}
              <button className="delete-btn" onClick={() => deleteTask(t._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}