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
