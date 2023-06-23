import { USER_ROLE } from '../../../enum/user.enum';
import User from './user.model';

// create an 5 digit incremental id base on the last id in the database and add Year and Semester code prefix
export const generateStudentId = async (
  academicSemesterYear: string,
  semesterCode: string
) => {
  let lastId = 0;
  const lastUser = await User.findOne({ role: USER_ROLE.STUDENT }).sort({
    createdAt: -1,
  });

  if (lastUser) {
    const idLastFiveDigit = lastUser.id.slice(-5);
    lastId = parseInt(idLastFiveDigit);
  }

  const newIncrementalStrId = (lastId + 1).toString().padStart(5, '0');
  const newId = `${academicSemesterYear.slice(
    -2
  )}${semesterCode}${newIncrementalStrId}`;
  return newId;
};

// create an 5 digit incremental id base on the last id in the database and add A- prefix
export const generateAdminId = async () => {
  let lastId = 0;
  const lastUser = await User.findOne({ role: USER_ROLE.ADMIN }).sort({
    createdAt: -1,
  });
  if (lastUser) {
    const idLastFiveDigit = lastUser.id.slice(-5);
    lastId = parseInt(idLastFiveDigit);
  }
  const newIncrementalStrId = (lastId + 1).toString().padStart(5, '0');
  const newId = `A-${newIncrementalStrId}`;
  return newId;
};

// create an 5 digit incremental id base on the last id in the database and add F- prefix
export const generateFacultyId = async () => {
  let lastId = 0;
  const lastUser = await User.findOne({ role: USER_ROLE.FACULTY }).sort({
    createdAt: -1,
  });
  if (lastUser) {
    const idLastFiveDigit = lastUser.id.slice(-5);
    lastId = parseInt(idLastFiveDigit);
  }
  const newIncrementalStrId = (lastId + 1).toString().padStart(5, '0');
  const newId = `F-${newIncrementalStrId}`;
  return newId;
};
