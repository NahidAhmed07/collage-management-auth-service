import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';
import { pick } from '../../../shared/pick';
import { paginationOptionsFields } from '../../../constants/pagination';
import preparePaginationOptions from '../../helper/preparePaginationOptions';
import ApiError from '../../../errors/ApiError';

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const bodyData = req.body;
  const createdDepartment = await AcademicDepartmentService.createDepartment(
    bodyData
  );

  sendResponse(res, {
    message: 'Department created successfully',
    data: createdDepartment,
    success: true,
    statusCode: httpStatus.OK,
  });
});

const getAllDepartments: RequestHandler = catchAsync(async (req, res) => {
  const paginationQuery = pick(req.query, paginationOptionsFields);
  const paginationOptions = preparePaginationOptions(paginationQuery);
  const filterOptions = pick(req.query, ['searchTerm', 'title', 'id']);

  const result = await AcademicDepartmentService.getAllDepartments(
    paginationOptions,
    filterOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Departments Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const department = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department Fetched Successfully',
    data: department,
  });
});

const updateDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const bodyData = req.body;
  const updatedDepartment = await AcademicDepartmentService.updateDepartment(
    id,
    bodyData
  );

  sendResponse(res, {
    message: 'Department updated successfully',
    data: updatedDepartment,
    success: true,
    statusCode: httpStatus.OK,
  });
});

const deleteDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }

  sendResponse(res, {
    message: 'Department deleted successfully',
    success: true,
    statusCode: httpStatus.OK,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
