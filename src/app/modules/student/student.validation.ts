import { z } from 'zod';
import { _bloodGroup, _gender } from '../user/user.constant';

export const updateStudentZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().min(2).max(20).optional(),
        middleName: z.string().min(2).max(20).optional(),
        lastName: z.string().min(2).max(20).optional(),
      })
      .optional(),

    email: z.string().email().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum([..._gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([..._bloodGroup] as [string, ...string[]]).optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),

    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicSemester: z.string().optional(),
  }),
});
