import User from './user.model'

// create an 5 digit incremental id base on the last id in the database
export const createId = async () => {
  const lastUser = await User.findOne({}).sort({ createdAt: -1 })

  const lastId = lastUser?.id || 0
  const newId = parseInt(lastId) + 1
  return newId.toString().padStart(5, '0')
}
