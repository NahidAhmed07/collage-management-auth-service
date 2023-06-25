import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentZodSchema } from './student.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../../enum/user.enum';

const studentRouter = express.Router();

studentRouter.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  StudentController.updateStudent
);

studentRouter.get('/:id', StudentController.getSingleStudent);
studentRouter.delete('/:id', StudentController.deleteStudent);

studentRouter.get(
  '/',

  auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY),

  StudentController.getAllStudents
);

export default studentRouter;
