const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks from localStorage
window.addEventListener("DOMContentLoaded", () => {
  tasks.forEach(task => renderTask(task.text, task.completed));
  updateCounter();
});

function saveTasks() {
  const allTasks = [...document.querySelectorAll(".task")].map(task => ({
    text: task.querySelector("span").textContent,
    completed: task.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function renderTask(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.className = "task";
  if (isCompleted) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
    updateCounter();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.classList.add("fadeOut");
    setTimeout(() => {
      taskList.removeChild(li);
      saveTasks();
      updateCounter();
    }, 300);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    renderTask(taskText);
    saveTasks();
    taskInput.value = "";
    taskInput.focus();
    updateCounter();
  } else {
    alert("Please enter a task.");
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Filter tasks
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll(".task").forEach(task => {
      switch (filter) {
        case "all":
          task.style.display = "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed") ? "flex" : "none";
          break;
        case "active":
          task.style.display = !task.classList.contains("completed") ? "flex" : "none";
          break;
      }
    });
  });
});

function updateCounter() {
  const total = document.querySelectorAll(".task").length;
  const completed = document.querySelectorAll(".task.completed").length;
  const active = total - completed;
  document.getElementById("counter").textContent = `Total: ${total} | Active: ${active} | Completed: ${completed}`;
}
