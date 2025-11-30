import {
  LoginUserSchema,
  RegisterUserSchema,
  VerifyUserSchema
} from '@monorepo/schemas'
import { Router } from 'express'
import {
  loginUser,
  registerUser,
  verifyUser
} from '../controllers/auth.controller'
import { validateData } from '../middleware/validateEntries'

const router: Router = Router()

router.post('/login', validateData(LoginUserSchema), loginUser)
router.post('/register', validateData(RegisterUserSchema), registerUser)
router.post('/verify', validateData(VerifyUserSchema), verifyUser)

export default router
