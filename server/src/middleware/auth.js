import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import User from '../models/User.js'
import { verifyAccessToken } from '../utils/tokens.js'

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not logged in')
  }

  let payload
  try {
    payload = verifyAccessToken(header.split(' ')[1])
  } catch {
    throw new ApiError(401, 'Invalid or expired token')
  }

  // Always load the user from the database.
  // Never trust the token or the browser for role or organization.
  const user = await User.findById(payload.sub)
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Account not found or disabled')
  }

  req.user = user
  req.organizationId = user.organizationId
  next()
})