export interface User {
  username: string;
  role: "admin" | "employee";
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export interface SessionData {
  user?: User;
}

export interface LoginResponse {
  status: boolean;
  data?: {
    user: User;
  };
  error?: {
    message: string;
  };
}

export interface LogoutResponse {
  status: boolean;
  message?: string;
}

export interface SessionConfig {
  name?: string;
  password?: string;
}
