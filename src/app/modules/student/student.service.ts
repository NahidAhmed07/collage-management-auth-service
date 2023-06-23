/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { studentSearchableFields } from './student.constant';
import {
  Guardian,
  IStudent,
  IStudentFilter,
  LocalGuardian,
  Name,
} from './student.interface';
import Student from './student.model';

const getAllStudents = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IStudentFilter
) => {
  const { page, skip, limit, sort } = paginationOptions;
  const { searchTerm, ...filterFields } = filterOptions;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterFields).length) {
    andCondition.push(
      ...Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      }))
    );
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const fetchedData = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await Student.countDocuments(whereCondition);

  return {
    data: fetchedData,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment');

  return result;
};

// update single academic semester by id
const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...updateData } = payload;

  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  if (name && Object.keys(name).length) {
    Object.entries(name).forEach(([field, value]) => {
      const nameField = `name.${field}` as keyof Name;
      (updateData as any)[nameField] = value;
    });
  }

  if (guardian && Object.keys(guardian).length) {
    Object.entries(guardian).forEach(([field, value]) => {
      const guardianField = `guardian.${field}` as keyof Guardian;
      (updateData as any)[guardianField] = value;
    });
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    Object.entries(localGuardian).forEach(([field, value]) => {
      const localGuardianField =
        `localGuardian.${field}` as keyof LocalGuardian;
      (updateData as any)[localGuardianField] = value;
    });
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No data to update. Please provide valid data'
    );
  }

  const result = await Student.findOneAndUpdate({ id }, updateData, {
    new: true,
  });
  //   .populate('academicSemester')
  //     .populate('academicFaculty')
  //     .populate('academicDepartment')

  return result;
};

// delete single academic semester by id
const deleteStudent = async (id: string) => {
  const result = await Student.findOneAndDelete({ id });
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
