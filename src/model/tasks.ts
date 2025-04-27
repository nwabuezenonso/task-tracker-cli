export type TaskStatus = "todo" | "in-progress" | "done";

export default class Task {
  constructor(
    public id: number,
    public description: string,
    public status: TaskStatus = "todo",
    public createdAt: string = new Date().toISOString(),
    public updatedAt: string = new Date().toISOString()
  ) {}

  updateDescription(newDesc: string) {
    this.description = newDesc;
    this.updatedAt = new Date().toISOString();
  }

  updateStatus(newStatus: TaskStatus) {
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();
  }
}
