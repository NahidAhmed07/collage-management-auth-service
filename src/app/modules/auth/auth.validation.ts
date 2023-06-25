import { z } from 'zod';

export const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z
      .string({
        required_error: 'password is required',
      })
      .min(6)
      .max(100),
  }),
});

export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
});
