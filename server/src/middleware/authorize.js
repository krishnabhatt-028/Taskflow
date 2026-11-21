import ApiError from '../utils/ApiError.js'

export default function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission to do this'))
    }
    next()
  }
}