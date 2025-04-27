import fs from "fs"; // fs is a file system module in nodejs
import Task from "../model/tasks";

const filePath = "./tasks.json"; // this is the file that we want to work with

// load task is a function that allows us to load our
export const loadTasks = (): Task[] => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
    return [];
  }

  const data = fs.readFileSync(filePath, "utf-8");

  // Handle empty file content gracefully
  if (data.trim() === "") {
    fs.writeFileSync(filePath, "[]");
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to parse tasks.json. Resetting file.");
    fs.writeFileSync(filePath, "[]");
    return [];
  }
};

// save tasks will write the task in the file path
export const saveTasks = (tasks: Task[]) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};
