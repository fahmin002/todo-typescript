/**
 * include css styles
 */
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

/**
 * Element declarations
 */
const tasks: Array<string> = [];
const taskForm = document.getElementById("todo-form") as HTMLElement | null;
const taskInputBar = document.getElementById(
  "todo-input",
) as HTMLInputElement | null;
const tasksContainer = document.getElementById(
  "todo-list",
) as HTMLElement | null;

/** Function definitions */
const viewAllTask = (tasks: Array<string>): void => {
  if (tasksContainer) {
    tasksContainer.innerHTML = "";
  }
  tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    const completeButton = document.createElement("button");
    const taskTitle = document.createElement("div");

    taskTitle.innerHTML = task;
    completeButton.role = "checkbox";
    completeButton.classList.add("toggle-check");
    completeButton.setAttribute("data-tooltip", "Mark As Completed");
    completeButton.ariaChecked = "false";
    completeButton.innerHTML = `<i class="fa-regular fa-circle"></i>`;
    completeButton.addEventListener("click", () => markAsCompleted(task))
    completeButton.addEventListener("mouseenter", () =>
      toggleCheckButton(completeButton, true),
    );

    completeButton.addEventListener("mouseleave", () =>
      toggleCheckButton(completeButton, false),
    );

    taskElement.append(completeButton);
    taskElement.append(taskTitle);
    taskElement.style.display = "flex";
    taskElement.style.gap = "1rem";
    tasksContainer?.appendChild(taskElement);
  });
};

const addTask = (): void => {
    if (taskInputBar && taskInputBar!.value.trim()) {
         const taskValue = taskInputBar!.value.trim();
         tasks.push(taskValue);
	 taskInputBar!.value = "";
	 viewAllTask(tasks);
    }
};

const markAsCompleted = (taskTitle: string): void => {
    const taskIndex = tasks.findIndex(task => task === taskTitle);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
    viewAllTask(tasks);
};

const toggleCheckButton = (
  completeButton: HTMLButtonElement,
  hover: boolean,
): any => {
  const completeButtonSymbol = completeButton.querySelector(
    "i",
  ) as HTMLElement | null;
  if (hover) {
    completeButtonSymbol?.classList.remove("fa-circle");
    completeButtonSymbol?.classList.add("fa-circle-check");
  } else {
    completeButtonSymbol?.classList.remove("fa-circle-check");
    completeButtonSymbol?.classList.add("fa-circle");
  }
};

const main = (): void => {
  viewAllTask(tasks);
  taskForm!.addEventListener('submit', (evt) => {
	addTask();
        evt.preventDefault();
  });
};
document.addEventListener("DOMContentLoaded", main);
