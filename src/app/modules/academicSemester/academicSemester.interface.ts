import { Model } from 'mongoose';

export type IMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemesterTitle = 'Autumn' | 'Fall' | 'Summer';
export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IAcademicSemesterTitle;
  year: string;
  code: IAcademicSemesterCode;
  startMonth: IMonth;
  endMonth: IMonth;
};

export type IAcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilterOptions = {
  searchTerm?: string;
  title?: string;
  year?: number;
  code?: string;
};
