import {
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
  IMonth,
} from './academicSemester.interface';

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];
export const Months: IMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: Record<string, string> = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields = ['title', 'code', 'year'];
