import { LoginUserSchema, RegisterUserSchema } from '@monorepo/schemas'
import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/authController'
import { validateData } from '../middleware/validateEntries'

const router: Router = Router()

router.post('/login', validateData(LoginUserSchema), loginUser)
router.post('/register', validateData(RegisterUserSchema), registerUser)

export default router
