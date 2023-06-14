import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import preparePaginationOptions from '../../helper/preparePaginationOptions';
import { pick } from '../../../shared/pick';
import { paginationOptionsFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';

// create academic semester with title, year and code and endMonth and startMonth
const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemester(req.body);

  sendResponse(res, {
    success: true,
    data: result,
    message: 'Academic Semester created successfully',
    statusCode: httpStatus.OK,
  });
});

// get all academic semester  with pagination and filter options (search, title, year, code)
const getAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const paginationQuery = pick(req.query, paginationOptionsFields);
  const filterOptions = pick(req.query, [
    'searchTerm',
    'title',
    'year',
    'code',
  ]);
  const paginationOptions = preparePaginationOptions(paginationQuery);

  const result = await AcademicSemesterService.getAcademicSemesters(
    paginationOptions,
    filterOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single academic semester by id
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleAcademicSemester(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester fetched successfully',
      data: result,
    });
  }
);

// update academic semester by id
const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateAcademicSemester(
    id,
    updatedData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

// delete academic semester by id
const deleteAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteAcademicSemester(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Academic Semester not found ');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Semester deleted Successfully',
    success: true,
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
