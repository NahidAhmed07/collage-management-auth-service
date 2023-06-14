import { Schema, model } from 'mongoose';

const AcademicDepartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const AcademicDepartment = model(
  'AcademicDepartment',
  AcademicDepartmentSchema
);

export default AcademicDepartment;
