import type { CreateTaskRequest, TaskRecord } from './models';

export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

/**
 * Type-safe API client for JATT API
 */
export class JattApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  /**
   * Makes an HTTP request to the API
   */
  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const options: RequestInit = {
      method,
      headers: this.headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new ApiError(
        `API Error: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      return (await response.json()) as T;
    }

    return (await response.text()) as unknown as T;
  }

  /**
   * Health check endpoint
   */
  async ping(): Promise<string> {
    const response = await this.request<string>('GET', '/api/ping');
    return response;
  }

  /**
   * Get tasks for a specific user
   */
  async getTasks(userId: string): Promise<TaskRecord[]> {
    const params = new URLSearchParams({ userId });
    const response = await this.request<TaskRecord[]>(
      'GET',
      `/api/tasks?${params.toString()}`,
    );
    return response;
  }

  /**
   * Create a new task
   */
  async createTask(request: CreateTaskRequest): Promise<TaskRecord> {
    const response = await this.request<TaskRecord>(
      'POST',
      '/api/tasks',
      request,
    );
    return response;
  }
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
