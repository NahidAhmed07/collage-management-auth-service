import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import userRoute from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', userRoute)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // res.send('Hello World!')
  next('Error')
})

export default app
