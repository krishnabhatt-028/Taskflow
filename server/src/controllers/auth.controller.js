import * as authService from '../services/auth.service.js'
import asyncHandler from '../utils/asyncHandler.js'
import sendResponse from '../utils/sendResponse.js'
import { refreshCookieOptions, clearCookieOptions } from '../utils/tokens.js'

const getMeta = (req) => ({
  userAgent: req.headers['user-agent'],
  ip: req.ip,
})

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(
    req.body,
    getMeta(req)
  )
  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  sendResponse(res, 201, 'Registered successfully', { user, accessToken })
})

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(
    req.body,
    getMeta(req)
  )
  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  sendResponse(res, 200, 'Logged in successfully', { user, accessToken })
})

export const refresh = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.refresh(
    req.cookies.refreshToken,
    getMeta(req)
  )
  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  sendResponse(res, 200, 'Token refreshed', { user, accessToken })
})

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.cookies.refreshToken)
  res.clearCookie('refreshToken', clearCookieOptions)
  sendResponse(res, 200, 'Logged out')
})

export const getMe = asyncHandler(async (req, res) => {
  sendResponse(res, 200, 'Current user', { user: req.user })
})