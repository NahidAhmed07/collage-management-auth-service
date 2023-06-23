import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { paginationOptionsFields } from '../../../constants/pagination';
import preparePaginationOptions from '../../helper/preparePaginationOptions';
import { studentFilterFields } from './student.constant';
import { StudentService } from './student.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const paginationQuery = pick(req.query, paginationOptionsFields);
  const paginationOptions = preparePaginationOptions(paginationQuery);
  const filterOptions = pick(req.query, studentFilterFields);

  const result = await StudentService.getAllStudents(
    paginationOptions,
    filterOptions
  );

  sendResponse(res, {
    data: result.data,
    meta: result.meta,
    statusCode: httpStatus.OK,
    message: 'Students fetched successfully',
    success: true,
  });
});
// get single student by id
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await StudentService.getSingleStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

// update student by id
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated Successfully',
    data: result,
  });
});

// delete student by id
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not found ');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully',
    success: true,
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
