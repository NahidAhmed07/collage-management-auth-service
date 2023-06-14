import z from 'zod';

const CreateUserZodSchema = z.object({
  body: z.object({
    role: z.enum(['admin', 'student', 'faculty']),
    password: z
      .string({
        required_error: 'password is required',
      })
      .min(6, 'password must be at least 6 characters'),
  }),
});

export const UserValidator = {
  CreateUserZodSchema,
};
