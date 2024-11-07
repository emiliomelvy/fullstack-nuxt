interface User {
  username: string;
  role: "admin" | "employee";
}

export async function getUser(
  username: string,
  password: string
): Promise<User | null> {
  if (username === "admin" && password === "admin") {
    return { username: "admin", role: "admin" };
  } else if (username === "employee" && password === "employee") {
    return { username: "employee", role: "employee" };
  }
  return null;
}
