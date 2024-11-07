import { getUser } from "~/server/repositories/user";
import { z } from "zod";
// import { defineEventHandler, useSession } from "h3";

const schema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(4, { message: "Invalid username" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, { message: "Password must be at least 4 characters" }),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = schema.parse(body);

    console.log("valid :", validatedData);
    const user = await getUser(validatedData.username, validatedData.password);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const session = await useSession(event, {
      password: "testingtestingtestingtestingtesting",
    });
    await session.update({
      user: {
        username: user.username,
        role: user.role,
      },
    });

    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: error.errors[0].message,
      });
    }
    throw error;
  }
});
