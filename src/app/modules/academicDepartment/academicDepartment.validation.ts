import { z } from 'zod';

export const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required ',
    }),
    faculty: z.string({
      required_error: 'faculty id is required',
    }),
  }),
});

export const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required ',
      })
      .optional(),
    faculty: z
      .string({
        required_error: 'faculty id is required',
      })
      .optional(),
  }),
});
