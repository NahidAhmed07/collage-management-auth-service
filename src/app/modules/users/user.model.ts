import { Schema, Model, model } from 'mongoose'
import { IUser } from './user.interface'

type UserModel = {
  myStaticMethod(): number
} & Model<IUser>

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
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = model<IUser, UserModel>('users', userSchema)

export default User
