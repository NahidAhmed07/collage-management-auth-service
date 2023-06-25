import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'students',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculties',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.static('isUserExisted', async function isUserExisted(id: string) {
  return await this.findOne(
    { id },
    {
      id: 1,
      role: 1,
      password: 1,
      needsPasswordChange: 1,
    }
  );
});

userSchema.static(
  'isPasswordMatched',
  async function isPasswordMatched(password: string, hashPassword: string) {
    const isMatched = await bcrypt.compare(password, hashPassword);
    return isMatched;
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

const User = model<IUser, UserModel>('users', userSchema);

export default User;
