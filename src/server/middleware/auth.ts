// import { defineEventHandler, useSession } from "h3";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "testingtestingtestingtestingtesting",
  });
  const path = getRequestURL(event).pathname;

  if (path === "/login") {
    if (session.data.user) {
      return sendRedirect(event, "/home");
    }
    return;
  }

  if (!session.data.user && path !== "/login") {
    return sendRedirect(event, "/login");
  }

  if (path === "/admin" && session.data.user?.role !== "admin") {
    return sendRedirect(event, "/home");
  }
});
