import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const bodyData = req.body
    const createdUser = await userService.createUser(bodyData)

    res.status(200).json({
      success: true,
      data: createdUser,
      message: 'User created successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  createUser,
}
