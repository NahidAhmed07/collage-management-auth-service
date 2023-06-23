import express from 'express';

import { FacultyController } from './faculty.controller';

import validateRequest from '../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';

const FacultyRoutes = express.Router();

FacultyRoutes.get('/:id', FacultyController.getSingleFaculty);
FacultyRoutes.get('/', FacultyController.getAllFaculties);

FacultyRoutes.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

FacultyRoutes.delete('/:id', FacultyController.deleteFaculty);

export default FacultyRoutes;
