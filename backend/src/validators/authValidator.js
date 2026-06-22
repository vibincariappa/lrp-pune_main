const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(30),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["SUPER_ADMIN1", "SUPER_ADMIN2", "ADMIN1", "ADMIN2", "DEVELOPER"], {
    message: "Invalid role value"
  })
});

const loginSchema = z.object({
  email: z.string().optional(),
  username: z.string().optional(),
  password: z.string().min(1, { message: "Password is required" })
}).refine(data => data.email || data.username, {
  message: "Either email or username must be provided",
  path: ["email", "username"]
});

module.exports = {
  registerSchema,
  loginSchema
};
