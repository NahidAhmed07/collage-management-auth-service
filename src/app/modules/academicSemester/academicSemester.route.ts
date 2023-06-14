import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  CreateAcademicSemesterZodSchema,
  UpdateAcademicSemesterZodSchema,
} from './academicSemester.validation';

const academicRouter = Router();

academicRouter.post(
  '/create-semester',
  validateRequest(CreateAcademicSemesterZodSchema), // validate request body with zod schema before calling controller
  AcademicSemesterController.createAcademicSemester // call controller function
);

// get single semester by id
academicRouter.get(
  '/:id',
  AcademicSemesterController.getSingleAcademicSemester
);

// update semester by id
academicRouter.patch(
  '/:id',
  validateRequest(UpdateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
);

academicRouter.delete(
  '/:id',
  AcademicSemesterController.deleteAcademicSemester
);

// get semester with pagination and filter options (search, title, year, code)
academicRouter.get('/', AcademicSemesterController.getAcademicSemesters);

export default academicRouter;
