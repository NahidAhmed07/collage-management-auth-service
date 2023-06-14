import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilterOptions,
} from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createDepartment = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  await result.populate('faculty');

  return result;
};

const getAllDepartments = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IAcademicDepartmentFilterOptions
) => {
  const { page, limit, skip, sort } = paginationOptions;
  const { searchTerm, ...filterFields } = filterOptions;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterFields).length) {
    andConditions.push(
      ...Object.entries(filterFields).map(([key, value]) => ({ [key]: value }))
    );
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .populate('faculty');

  const total = await AcademicDepartment.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      page,
      total,
      limit,
    },
  };
};

const getSingleDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate('faculty');
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('faculty');
  return result;
};

const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
