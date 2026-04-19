/**
 * Task priority levels
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Represents a task record
 */
export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: TaskPriority;
  tags: string[];
  dueDate?: string; // ISO 8601 date string
  userId: string;
  createdAt: string; // ISO 8601 date string
}

/**
 * Request to create a new task
 */
export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  tags: string[];
  dueDate?: string; // ISO 8601 date string
  userId: string;
}
