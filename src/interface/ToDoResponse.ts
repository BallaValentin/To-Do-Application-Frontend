export interface ToDoResponse {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  dueDate: Date;
  levelOfImportance: number;
}
