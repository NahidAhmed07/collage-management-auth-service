import {
  IAcademicSemester,
  IAcademicSemesterFilterOptions,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import {
  IPaginationGenericResult,
  IPaginationOptions,
} from '../../../interfaces/pagination';

// create academic semester with title, year and code and endMonth and startMonth
const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] === payload.code) {
    const result = await AcademicSemester.create(payload);
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
};

// get all academic semester  with pagination and filter options (search, title, year, code)
const getAcademicSemesters = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IAcademicSemesterFilterOptions
): Promise<IPaginationGenericResult<IAcademicSemester[]>> => {
  const { limit, skip, sort, page } = paginationOptions;
  const { searchTerm, ...filterFields } = filterOptions;

  const andCondition: object[] = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
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

  const result = await AcademicSemester.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort(sort);
  const total = await AcademicSemester.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      limit,
      page,
    },
  };
};

// get single academic semester by id
const getSingleAcademicSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);

  return result;
};

// update single academic semester by id
const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid Semester Code for this title'
    );
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// delete single academic semester by id
const deleteAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
