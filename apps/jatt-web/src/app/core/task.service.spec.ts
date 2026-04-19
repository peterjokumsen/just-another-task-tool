import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { JattApiClient } from '@just-another-task-tool/api-client';
import { vi } from 'vitest';

describe('TaskService', () => {
  let service: TaskService;
  let apiClientMock: Pick<JattApiClient, 'createTask' | 'getTasks'>;

  beforeEach(() => {
    apiClientMock = {
      createTask: vi.fn(),
      getTasks: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: JattApiClient, useValue: apiClientMock }],
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
