import { z } from "zod";

// Schemas:
export const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximun 32 characters"),
  remember: z.boolean(),
});

export type LoginCredentialsType = {
  email: string;
  password: string;
  remember: boolean;
};

export const LoginDefaultValues: LoginCredentialsType = {
  email: "",
  password: "",
  remember: false,
};
