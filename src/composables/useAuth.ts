import type { User, LoginResponse, LogoutResponse } from "types/auth";

export default function useAuth() {
  const user = useState<User | null>("user", () => null);
  const router = useRouter();

  const setUser = (userData: User | null) => {
    user.value = userData;
  };

  const login = async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    // status.value = "loading";
    try {
      const result = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });

      return { status: true, data: { user: result.user } };
      // if (result.status !== 200) {
      //   error.value = result.message;
      //   status.value = "error";
      //   return;
      // }

      // status.value = "success";
      // error.value = null;
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
      // error.value =
      //   (e as Error).message || "An error occurred while logging in";
      // status.value = "error";
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

  const checkAuth = async () => {
    try {
      const { data } = await useFetch<{ user?: User }>("/api/auth/check", {
        headers: useRequestHeaders(["cookie"]),
      });
      setUser(data.value?.user || null);
      return data.value?.user;
    } catch (error) {
      setUser(null);
      return null;
    }
  };

  return {
    user,
    setUser,
    login,
    logout,
    checkAuth,
  };
}
