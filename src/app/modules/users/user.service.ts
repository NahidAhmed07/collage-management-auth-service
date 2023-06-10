import User from './user.model'
import { createId } from './user.utils'
import config from '../../../config'

const createUser = async ({
  role,
  password,
}: {
  role: string
  password?: string
}) => {
  const id = await createId()
  const default_password = config.default_password
  const createdUser = await User.create({
    id,
    role,
    password: password || default_password,
  })

  return createdUser
}

export default {
  createUser,
}
