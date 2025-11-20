interface RegisterRequest {
  email: string;
  password: string;
  accountName: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  email: string;
  accountName: string;
  createdAt: string;
}

interface AuthResponse {
  token: string;
  user: UserResponse;
}

interface ApiError {
  error: {
    message: string;
    code: string;
    timestamp: string;
  };
}

export class ApiException extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'ApiException';
    this.code = code;
    this.status = status;
  }
}

class ApiClient {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  public async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        let errorData: ApiError;
        try {
          errorData = await response.json() as ApiError;
        } catch {
          throw new ApiException(
            `HTTP Error: ${response.status} ${response.statusText}`,
            'HTTP_ERROR',
            response.status
          );
        }

        throw new ApiException(
          errorData.error.message,
          errorData.error.code,
          response.status
        );
      }
      const data: T = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        error instanceof Error ? error.message : 'Network error or server unavailable',
        'NETWORK_ERROR',
        0
      );
    }
  }
}

export const apiClient = new ApiClient();