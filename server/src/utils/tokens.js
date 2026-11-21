import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { env } from '../config/env.js'

export const signAccessToken = (user) =>
  jwt.sign({ sub: user._id.toString() }, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpires,
  })

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.jwtAccessSecret)

export const generateRefreshToken = () => crypto.randomBytes(40).toString('hex')

export const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex')

const isProd = env.nodeEnv === 'production'

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  path: '/api/auth',
  maxAge: env.refreshExpiresDays * 24 * 60 * 60 * 1000,
}

export const clearCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  path: '/api/auth',
}