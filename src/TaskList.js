import React from "react";

function TaskList({currentTasks, updateTask, deleteTask}) {
  return (
    <div>
      <ul>
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <li key={task.id}>
              <textarea value={task.title} rows={1} cols={30} onChange={(e) => updateTask(task.id, "title", e.target.value)} />
              <select value={task.status} onChange={(e) => updateTask(task.id, "status", e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select value={task.priority} onChange={(e) => updateTask(task.id, "priority", e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button onClick={() => deleteTask(task.id)} id="deleteBtn" style={{backgroundColor:'red'}}>Delete Task</button>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;