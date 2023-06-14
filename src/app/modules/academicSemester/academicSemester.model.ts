import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterTitle,
  Months,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const AcademicSemesterSchema = new Schema<
  IAcademicSemester,
  IAcademicSemesterModel
>(
  {
    title: {
      type: String,
      enum: academicSemesterTitle,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// handle duplicate error

AcademicSemesterSchema.pre('save', async function (next) {
  const semester = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (semester) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exists');
  } else {
    next();
  }
});
AcademicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const payload = this.getUpdate() as { title: string; year: string };

  if (payload?.title && payload?.year) {
    const semester = await AcademicSemester.findOne({
      title: payload.title,
      year: payload.year,
    });

    if (semester) {
      throw new ApiError(httpStatus.CONFLICT, 'Semester already exists');
    } else {
      next();
    }
  } else {
    next();
  }
});

const AcademicSemester = model<IAcademicSemester, IAcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
);

export default AcademicSemester;
