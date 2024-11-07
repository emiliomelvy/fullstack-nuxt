export default defineEventHandler(async (event) => {
  try {
    const session = await useSession(event, {
      password: "testingtestingtestingtestingtesting",
    });

    const user = session.data.user;

    if (!user) {
      event.res.statusCode = 401;
      return { user: null };
    }

    // If the user is found in the session, return the user data
    return { user };
  } catch (error) {
    console.error("Error checking session:", error);
    return { user: null }; // Treat error cases as unauthenticated
  }
});
