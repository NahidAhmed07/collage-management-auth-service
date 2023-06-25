import { Router } from 'express';
import userRouter from '../modules/user/user.route';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.route';
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.route';
import academicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.route';
import studentRouter from '../modules/student/student.route';
import facultyRouter from '../modules/faculty/faculty.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import AuthRouter from '../modules/auth/auth.route';

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
  {
    path: '/student',
    router: studentRouter,
  },
  {
    path: '/faculty',
    router: facultyRouter,
  },
  {
    path: '/management-department',
    router: ManagementDepartmentRoutes,
  },
  {
    path: '/admin',
    router: AdminRoutes,
  },

  {
    path: '/auth',
    router: AuthRouter,
  },
];

modulesRoutes.forEach(route => {
  router.use(route.path, route.router);
});

export default router;
