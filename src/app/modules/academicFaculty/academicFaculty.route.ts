import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidationZodSchema } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const facultyRouter = Router();

facultyRouter.post(
  '/create-faculty',
  validateRequest(academicFacultyValidationZodSchema), // validate request body with zod schema before calling controller
  AcademicFacultyController.createAcademicFaculty
);

facultyRouter.get('/:id', AcademicFacultyController.getSingleFaculty);
facultyRouter.patch(
  '/:id',
  validateRequest(academicFacultyValidationZodSchema),
  AcademicFacultyController.updateSingleFaculty
);
facultyRouter.delete('/:id', AcademicFacultyController.deleteSingleFaculty);

facultyRouter.get('/', AcademicFacultyController.getAcademicFaculties);

export default facultyRouter;
