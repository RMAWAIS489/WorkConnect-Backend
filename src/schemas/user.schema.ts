import { object, string, TypeOf, z } from "zod";
import { UserRole } from "../entity/User.js";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email address is required",
    })
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters long")
      .max(255, "Email must be less than 255 characters long"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),
    role: z.optional(z.nativeEnum(UserRole)),
  }).refine((data: any) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Invalid email or passwordd"),
  }),
});
export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});


export const changePasswordSchema = object({
  body: object({
    currentPassword: string({
      required_error: "Current password is required",
    }),
    newPassword: string({
      required_error: "New password is required",
    })
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be less than 32 characters"),
  }),
});

export const updateEmailSchema = object({
  body: object({
    newEmail: string({
      required_error: "New email is required",
    }).email("Invalid email format"),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "passwordConfirm"
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>["params"];
export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>["body"];
export type UpdateEmailInput = TypeOf<typeof updateEmailSchema>["body"];