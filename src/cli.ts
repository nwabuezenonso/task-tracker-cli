import TaskService from "./services/taskService";

const args = process.argv.slice(2); // process.argv is a global object and slice allow you to remove the first 2 index
const taskService = new TaskService();

const command = args[0];
const id = parseInt(args[1]);
const input = args[1];

switch (command) {
  case "add":
    const added = taskService.add(input);
    console.log(`Task added successfully (ID: ${added.id})`);
    break;
  case "update":
    taskService.update(id, input)
      ? console.log("Task updated successfully.")
      : console.log("Task not found.");
    break;
  case "delete":
    taskService.delete(id) ? console.log("Task deleted.") : console.log("Task not found.");
    break;
  case "mark-in-progress":
    taskService.mark(id, "in-progress")
      ? console.log("Task marked as in-progress.")
      : console.log("Task not found.");
    break;
  case "mark-done":
    taskService.mark(id, "done")
      ? console.log("Task marked as done.")
      : console.log("Task not found.");
    break;
  case "list":
    const filter = args[1] as "done" | "todo" | "in-progress" | undefined;
    const tasks = taskService.list(filter);
    tasks.length
      ? tasks.forEach((t) => console.log(`${t.id}. ${t.description} [${t.status}]`))
      : console.log("No tasks found.");
    break;
  default:
    console.log("Unknown command");
}
