import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import { paginationOptionsFields } from '../../../constants/pagination';
import preparePaginationOptions from '../../helper/preparePaginationOptions';
import ApiError from '../../../errors/ApiError';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await AcademicFacultyService.createAcademicFaculty(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Academic Faculty Created Successfully',
    success: true,
  });
});

const getAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const paginationQuery = pick(req.query, paginationOptionsFields);
  const paginationOptions = preparePaginationOptions(paginationQuery);
  const filterOptions = pick(req.query, ['searchTerm']);

  const result = await AcademicFacultyService.getAcademicFaculties(
    paginationOptions,
    filterOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  });
});

const updateSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await AcademicFacultyService.updateSingleFaculty(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});

const deleteSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteSingleFaculty(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
