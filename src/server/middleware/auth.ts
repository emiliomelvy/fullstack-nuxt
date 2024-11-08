import { H3Event } from "h3";
import { SessionData, SessionConfig } from "~~/types/auth";

// interface SessionData {
//   user: {
//     id: string;
//     username: string;
//     // Add other user properties as needed
//   };
// }

const getSession = async (
  event: H3Event,
  config: SessionConfig
): Promise<SessionData | null> => {
  const sessionCookie = getCookie(event, config.name || "auth_session");
  if (!sessionCookie) return null;

  try {
    // Your session verification logic here
    // This is just an example - implement your actual session verification
    const sessionData = JSON.parse(sessionCookie);
    return sessionData;
  } catch (error) {
    return null;
  }
};

export default defineEventHandler(async (event: H3Event) => {
  // const publicRoutes = [
  //   "/api/auth/login",
  //   // "/api/auth/register",
  //   // "/api/auth/logout",
  // ];
  // const url = getRequestURL(event);
  // if (publicRoutes.includes(url.pathname)) {
  //   return;
  // }
  // // Create session config
  // const sessionConfig: SessionConfig = {
  //   name: "auth_session",
  //   // Add other config options as needed
  // };
  // const session = await getSession(event, sessionConfig);
  // if (!session) {
  //   throw createError({
  //     statusCode: 401,
  //     message: "Unauthorized",
  //   });
  // }
  // // Add user to event context
  // event.context.user = session.user;
});
