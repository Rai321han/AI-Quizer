import * as zod from "zod";

const signupSchema = zod.object({
  name: zod.string().min(3, "username must have at least 3 characters"),
  email: zod.email("invalid email address"),
  password: zod.string().min(8, "password must have at least 8 characters"),
});

export type SignUpType = zod.infer<typeof signupSchema>;
export { signupSchema };

const loginSchema = zod.object({
  email: zod.email("invalid email address"),
  password: zod.string().min(8, "password must have at least 8 characters"),
});

export type LoginType = zod.infer<typeof loginSchema>;
export { loginSchema };
