import { Router } from 'express'
import {
  register,
  login,
  refresh,
  logout,
  getMe,
} from '../controllers/auth.controller.js'
import validate from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { registerSchema, loginSchema } from '../validators/auth.validator.js'

const router = Router()

router.post('/register', authLimiter, validate(registerSchema), register)
router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/me', protect, getMe)

export default router