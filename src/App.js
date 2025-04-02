import React, { useState, useEffect } from "react";
import FilterButtons from "./FilterButtons";
import PaginationControls from "./PaginationControls";
import TaskList from "./TaskList";
import "./App.css";

// Initiating Task list
const initialTasks = [];

function App () {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPriority, setFilterPriority] = useState("All");

  // Form states for adding new task
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");

  // It Resets to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterPriority]);

  // Filtered tasks based on priority
  const filteredTasks = tasks.filter((task) => {
    return filterPriority === "All" || task.priority === filterPriority;
  });

  // Total tasks and percentage of completed tasks
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((task) => task.status === "Completed").length;
  const completionPercentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

  // Function to add a new task also to prevent empty tasks
  function addTask () {
    if (!title.trim()) {
      alert("Enter Title first...");
      return;
    };

    const newTask = {
      id: tasks.length + 1,
      title,
      status,
      priority,
    };

    setTasks([...tasks, newTask]);
    setTitle(""); // Clear input
    setCurrentPage(1); // Reset to first page when a task is added
  };

  // Function to update a task
  function updateTask (id, field, value) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  // Function to delete a task
  function deleteTask (id) {
    setTasks(tasks.filter((task) => task.id !== id));
    if (tasks.length % itemsPerPage === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Adjust page if last item on the page is deleted
    }
  };

  return (
    <div>
      <h2>Task Manager <sup style={{fontSize:'10px', fontFamily:'arial'}}>by Haresh</sup></h2>

      {/* Task Input Form */}
      <div className="inner" id="inputDiv">
        <input type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask} style={{backgroundColor:'green'}}>Add Task</button>
      </div>

      {/* Priority Filters */}
      <div className="inner" id="filters">
        <FilterButtons filterPriority={filterPriority} handlePriorityFilterChange={setFilterPriority} />
      </div>

      {/* Display total tasks and completion in percentage */}
      <div className="inner" id="tracker">
        <p>Total tasks: {totalTasks} | Completed: {completedTasks} | Progress: {completionPercentage}%</p>
      </div>

      {/* Task List */}
      <div className="inner">
        <TaskList currentTasks={currentTasks} updateTask={updateTask} deleteTask={deleteTask} />
      </div>

      {/* Pagination Controls */}
      <div className="inner" id="pagination">
        <PaginationControls currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default App;
