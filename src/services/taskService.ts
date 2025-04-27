import Task, { TaskStatus } from "../model/tasks";
import { loadTasks, saveTasks } from "../utils/fileHandler";

export default class TaskService {
  tasks: Task[] = [];

  constructor() {
    this.tasks = loadTasks();
  }

  add(description: string): Task {
    const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    const task = new Task(id, description);
    this.tasks.push(task);
    saveTasks(this.tasks);
    return task;
  }

  update(id: number, description: string): Task | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    task.updateDescription(description);
    saveTasks(this.tasks);
    return task;
  }

  delete(id: number): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    saveTasks(this.tasks);
    return true;
  }

  mark(id: number, status: TaskStatus): Task | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    task.updateStatus(status);
    saveTasks(this.tasks);
    return task;
  }

  list(status?: TaskStatus): Task[] {
    return status ? this.tasks.filter((t) => t.status === status) : this.tasks;
  }
}
