import { Task } from './task.model';

describe('Task', () => {
  it('should create a task', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      isCompleted: false,
      priority: 'Low',
      tags: ['tag1', 'tag2'],
      dueDate: '2022-01-01',
      userId: 'user1',
      createdAt: '2022-01-01',
    };
    expect(task).toBeTruthy();
  });
});
