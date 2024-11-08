import type { LoginResponse, LogoutResponse } from "types/auth";

export default function useAuth() {
  const login = async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const result = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });

      return { status: true, data: { user: result.user } };
    } catch (e) {
      if (e.response?.status === 401) {
        return {
          status: false,
          error: {
            message:
              "Invalid credentials. Please check your username and password.",
          },
        };
      }
      return { status: false, error: e };
    }
  };

  const logout = async (): Promise<LogoutResponse> => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });

      return { status: true, message: "Logged out successfully" };
    } catch (error) {
      return { status: false, message: "Logout failed" };
    }
  };
  return {
    login,
    logout,
  };
}
