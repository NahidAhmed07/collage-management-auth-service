import { Router } from 'express';
import userRouter from '../modules/user/user.route';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.route';
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.route';
import academicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/academic-semester',
    router: academicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    router: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    router: academicDepartmentRoutes,
  },
];

modulesRoutes.forEach(route => {
  router.use(route.path, route.router);
});

export default router;
