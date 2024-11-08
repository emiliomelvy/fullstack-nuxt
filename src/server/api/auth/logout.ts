export default defineEventHandler(async (event) => {
  try {
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to log out",
    });
  }
});
