import { Router } from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validation';

const academicDepartmentRoutes = Router();

academicDepartmentRoutes.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  AcademicDepartmentController.createDepartment
);

academicDepartmentRoutes.get(
  '/:id',
  AcademicDepartmentController.getSingleDepartment
);

academicDepartmentRoutes.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);

academicDepartmentRoutes.delete(
  '/:id',
  AcademicDepartmentController.deleteDepartment
);

academicDepartmentRoutes.get(
  '/',
  AcademicDepartmentController.getAllDepartments
);

export default academicDepartmentRoutes;
