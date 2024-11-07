import type { User } from "types/auth";

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const router = useRouter();

  const setUser = (userData: User | null) => {
    user.value = userData;
  };

  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
      user.value = null;
      await router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
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
    logout,
    checkAuth,
  };
};
