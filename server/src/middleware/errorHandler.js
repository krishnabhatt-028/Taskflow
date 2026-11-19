import ApiError from '../utils/ApiError.js'
import { env } from '../config/env.js'

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong'

  // Mongoose validation error (a required field is missing, etc.)
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
  }

  // Invalid MongoDB id, for example /api/tasks/abc
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}`
  }

  // Duplicate unique value, for example an email that already exists
  if (err.code === 11000) {
    statusCode = 409
    message = `${Object.keys(err.keyValue)[0]} already exists`
  }

  if (statusCode >= 500) {
    console.error(err)
    if (env.nodeEnv === 'production') message = 'Internal server error'
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv !== 'production' && { stack: err.stack }),
  })
}