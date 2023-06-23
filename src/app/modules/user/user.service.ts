import User from './user.model';
import config from '../../../config';
import { generateFacultyId, generateStudentId } from './user.utils';
import { IStudent } from '../student/student.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { USER_ROLE } from '../../../enum/user.enum';
import { IUser } from './user.interface';
import mongoose from 'mongoose';
import Student from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

const createStudent = async (student: IStudent, user: IUser) => {
  if (!user.password) {
    user.password = config.default_password as string;
  }

  user.role = USER_ROLE.STUDENT;

  // generate student id based on academic semester year and code
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  if (!academicSemester) {
    throw new Error(
      'academic semester not found. please provide valid academic semester id'
    );
  }

  let newUserData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const studentId = await generateStudentId(
      academicSemester.year,
      academicSemester.code
    );
    student.id = studentId;
    user.id = studentId;

    const createdStudent = await Student.create([student], { session });

    if (!createdStudent.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'student not created. please try again'
      );
    }

    user.student = createdStudent[0]._id;

    const createdUser = await User.create([user], { session });

    if (!createdUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'user not created. please try again'
      );
    }

    newUserData = createdUser[0];

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return newUserData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }

  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
};
