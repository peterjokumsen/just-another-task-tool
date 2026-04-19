import { inject, Injectable } from '@angular/core';
import {
  CreateTaskRequest,
  JattApiClient,
} from '@just-another-task-tool/api-client';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiClient = inject(JattApiClient);

  async getTasks() {
    return this.apiClient.getTasks('user-id');
  }

  async createTask(task: CreateTaskRequest) {
    return this.apiClient.createTask(task);
  }
}
