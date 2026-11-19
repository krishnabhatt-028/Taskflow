import { Router } from 'express'
import sendResponse from '../utils/sendResponse.js'

const router = Router()

router.get('/health', (req, res) => {
  sendResponse(res, 200, 'TaskFlow server is running and connected!', {
    time: new Date().toISOString(),
  })
})

// Phase 4: router.use('/auth', authRoutes)
// Phase 6: router.use('/projects', projectRoutes)
// Phase 7: router.use('/tasks', taskRoutes)

export default router