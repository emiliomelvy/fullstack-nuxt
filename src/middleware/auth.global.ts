import type { User } from "../../types/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const { $auth } = useNuxtApp();
  const user = useState<User | null>("user");

  const publicRoutes: string[] = ["/home", "/login"];

  if (publicRoutes.includes(to.path)) {
    if (user.value) {
      return navigateTo("/home");
    }
    return;
  }

  try {
    const { data } = await useFetch<{ user: User }>("/api/auth/check", {
      headers: useRequestHeaders(["cookie"]),
    });

    if (!data.value?.user) {
      return navigateTo("/login");
    }

    user.value = data.value.user;

    if (to.path === "/admin" && data.value.user.role !== "admin") {
      return navigateTo("/home");
    }
  } catch (error) {
    return navigateTo("/login");
  }
});
