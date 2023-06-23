import z from 'zod';
import { _bloodGroup, _gender } from './user.constant';

const CreateStudentZodSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, 'password must be at least 6 characters')
      .optional(),

    student: z.object(
      {
        name: z.object({
          firstName: z
            .string({
              required_error: 'first name is required',
            })
            .min(2, 'first name must be at least 2 characters')
            .max(20, 'first name must be less than 20 characters'),
          middleName: z
            .string()
            .min(2, 'middle name must be at least 2 characters')
            .max(20, 'middle name must be less than 20 characters')
            .optional(),
          lastName: z
            .string({
              required_error: 'last name is required',
            })
            .min(2, 'last name must be at least 2 characters')
            .max(20, 'last name must be  less than characters'),
        }),

        email: z
          .string({
            required_error: 'email is required',
          })
          .email('invalid email'),
        dateOfBirth: z.string({
          required_error: 'date of birth is required',
        }),
        gender: z.enum([..._gender] as [string, ...string[]], {
          required_error: 'gender is Required',
        }),
        bloodGroup: z.enum([..._bloodGroup] as [string, ...string[]], {
          required_error: 'blood group is Required',
        }),
        contactNo: z.string({
          required_error: 'contact no is required',
        }),
        emergencyContactNo: z.string({
          required_error: 'emergency contact no is required',
        }),

        presentAddress: z.string({
          required_error: 'present address is required',
        }),
        permanentAddress: z.string({
          required_error: 'permanent address is required',
        }),
        guardian: z.object({
          fatherName: z.string({
            required_error: 'father name is required',
          }),
          fatherOccupation: z.string({
            required_error: 'father occupation is required',
          }),
          fatherContactNo: z.string({
            required_error: 'father contact no is required',
          }),
          motherName: z.string({
            required_error: 'mother name is required',
          }),
          motherOccupation: z.string({
            required_error: 'mother occupation is required',
          }),
          motherContactNo: z.string({
            required_error: 'mother contact no is required',
          }),
          address: z.string({
            required_error: 'address is required',
          }),
        }),
        localGuardian: z.object({
          name: z.string({
            required_error: 'local guardian name is required',
          }),
          occupation: z.string({
            required_error: 'local guardian occupation is required',
          }),
          contactNo: z.string({
            required_error: 'local guardian contact no is required',
          }),
          address: z.string({
            required_error: 'local guardian address is required',
          }),
        }),
        academicFaculty: z.string({
          required_error: 'academic faculty is required',
        }),
        academicDepartment: z.string({
          required_error: 'academic department is required',
        }),
        academicSemester: z.string({
          required_error: 'academic semester is required',
        }),
      },
      {
        required_error: 'student is required',
      }
    ),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z
        .string({
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),

      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.string({
        required_error: 'Gender is required',
      }),

      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      designation: z.string({
        required_error: 'Designation is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidator = {
  CreateStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
