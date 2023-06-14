import z from 'zod';
import {
  Months,
  academicSemesterCode,
  academicSemesterTitle,
} from './academicSemester.constant';

export const CreateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string], {
      required_error: 'title is required',
    }),
    code: z.enum([...academicSemesterCode] as [string], {
      required_error: 'code is required',
    }),
    year: z.string({ required_error: 'year is required' }),
    startMonth: z.enum([...Months] as [string], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...Months] as [string], {
      required_error: 'endMonth is required',
    }),
  }),
});

// update semester by id with title, year, code, startMonth and endMonth all are optional if you need to update title then you must be pass code
export const UpdateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string], {
          required_error: 'title is required',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCode] as [string], {
          required_error: 'code is required',
        })
        .optional(),
      year: z.string({ required_error: 'year is required' }).optional(),
      startMonth: z
        .enum([...Months] as [string], {
          required_error: 'startMonth is required',
        })
        .optional(),
      endMonth: z
        .enum([...Months] as [string], {
          required_error: 'endMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code && data.body.year) ||
      (!data.body.title && !data.body.code && !data.body.year),
    {
      message:
        'if you need to update title then you must be pass code with title and year',
      path: ['title and code'],
    }
  );
