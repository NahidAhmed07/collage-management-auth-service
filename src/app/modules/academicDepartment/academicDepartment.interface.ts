import { Model } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepartment = {
  title: string;
  faculty: string | IAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};

export type IAcademicDepartmentModel = Model<IAcademicDepartment>;

export type IAcademicDepartmentFilterOptions = {
  searchTerm?: string;
  title?: string;
};
