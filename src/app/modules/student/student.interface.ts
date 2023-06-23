import { Model, Types } from 'mongoose';

export type IStudent = {
  id: string;
  name: Name;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicSemester: Types.ObjectId;
  guardian: Guardian;
  localGuardian: LocalGuardian;
};

export type Name = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilter = {
  searchTerm?: string;
  name?: string;
  role?: string;
  email?: string;
  contactNo?: string;
  academicFaculty?: string;
  academicDepartment?: string;
  academicSemester?: string;
};
