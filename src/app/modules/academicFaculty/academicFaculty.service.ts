import {
  IPaginationGenericResult,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilterOptions,
} from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const faculty = await AcademicFaculty.create(payload);

  return faculty;
};

const getAcademicFaculties = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IAcademicFacultyFilterOptions
): Promise<IPaginationGenericResult<IAcademicFaculty[] | null>> => {
  const { page, limit, skip, sort } = paginationOptions;
  const { searchTerm } = filterOptions;

  const query: Record<string, object> = {};
  if (searchTerm) {
    query['title'] = {
      $regex: searchTerm,
      $options: 'i',
    };
  }

  const whereCondition = Object.keys(query).length ? query : {};

  const faculties = await AcademicFaculty.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await AcademicFaculty.countDocuments(whereCondition);

  return {
    data: faculties,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleFaculty = async (id: string) => {
  const faculty = await AcademicFaculty.findById(id);

  return faculty;
};

const updateSingleFaculty = async (id: string, payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
