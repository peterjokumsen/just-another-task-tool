/**
 * Based on C# jatt_api.Models.TaskRecord
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Based on C# jatt_api.Models.TaskRecord
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: TaskPriority;
  tags: string[];
  dueDate?: string;
  userId: string;
  createdAt: string;
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt'>;
