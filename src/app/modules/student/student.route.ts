import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentZodSchema } from './student.validation';

const studentRouter = express.Router();

studentRouter.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  StudentController.updateStudent
);

studentRouter.get('/:id', StudentController.getSingleStudent);
studentRouter.delete('/:id', StudentController.deleteStudent);

studentRouter.get('/', StudentController.getAllStudents);

export default studentRouter;
