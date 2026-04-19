import { JattApiClient, ApiError } from './jatt-api-client';

describe('JattApiClient', () => {
  let client: JattApiClient;

  beforeEach(() => {
    client = new JattApiClient({
      baseUrl: 'http://localhost:7071/api',
    });
  });

  describe('client initialization', () => {
    it('should create client with baseUrl', () => {
      expect(client).toBeDefined();
    });

    it('should remove trailing slash from baseUrl', () => {
      const clientWithSlash = new JattApiClient({
        baseUrl: 'http://localhost:7071/api/',
      });
      expect(clientWithSlash).toBeDefined();
    });

    it('should merge custom headers', () => {
      const customClient = new JattApiClient({
        baseUrl: 'http://localhost:7071/api',
        headers: {
          Authorization: 'Bearer token',
        },
      });
      expect(customClient).toBeDefined();
    });
  });

  describe('ApiError', () => {
    it('should create error with status code', () => {
      const error = new ApiError('Not found', 404);
      expect(error.message).toBe('Not found');
      expect(error.statusCode).toBe(404);
      expect(error.name).toBe('ApiError');
    });
  });
});
