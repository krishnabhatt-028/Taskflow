import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Organization from '../models/Organization.js'
import RefreshToken from '../models/RefreshToken.js'
import ApiError from '../utils/ApiError.js'
import { ROLES } from '../constants/roles.js'
import { env } from '../config/env.js'
import {
  signAccessToken,
  generateRefreshToken,
  hashToken,
} from '../utils/tokens.js'

const makeSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') +
  '-' +
  Math.random().toString(36).slice(2, 7)

const issueTokens = async (user, meta) => {
  const refreshToken = generateRefreshToken()

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(
      Date.now() + env.refreshExpiresDays * 24 * 60 * 60 * 1000
    ),
    userAgent: meta.userAgent,
    ip: meta.ip,
  })

  return { accessToken: signAccessToken(user), refreshToken }
}

export const register = async (
  { name, email, password, organizationName },
  meta
) => {
  if (await User.exists({ email })) {
    throw new ApiError(409, 'Email already registered')
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const org = await Organization.create({
    name: organizationName,
    slug: makeSlug(organizationName),
  })

  let user
  try {
    user = await User.create({
      name,
      email,
      passwordHash,
      role: ROLES.ADMIN,
      organizationId: org._id,
    })
    org.owner = user._id
    await org.save()
  } catch (err) {
    await Organization.findByIdAndDelete(org._id)
    throw err
  }

  const tokens = await issueTokens(user, meta)
  return { user, ...tokens }
}

export const login = async ({ email, password }, meta) => {
  const user = await User.findOne({ email }).select('+passwordHash')
  const valid = user && user.isActive && (await user.comparePassword(password))

  // Same message for a wrong email and a wrong password,
  // so attackers cannot find out which emails exist
  if (!valid) throw new ApiError(401, 'Invalid email or password')

  const tokens = await issueTokens(user, meta)
  return { user, ...tokens }
}

export const refresh = async (rawToken, meta) => {
  if (!rawToken) throw new ApiError(401, 'No refresh token')

  const stored = await RefreshToken.findOne({ tokenHash: hashToken(rawToken) })
  if (!stored) throw new ApiError(401, 'Invalid refresh token')

  // A used token coming back may be stolen: log the user out everywhere
  if (stored.revoked) {
    await RefreshToken.updateMany({ userId: stored.userId }, { revoked: true })
    throw new ApiError(401, 'Session expired, please log in again')
  }

  if (stored.expiresAt < new Date()) {
    throw new ApiError(401, 'Session expired, please log in again')
  }

  const user = await User.findById(stored.userId)
  if (!user || !user.isActive) throw new ApiError(401, 'Account not available')

  stored.revoked = true
  await stored.save()

  const tokens = await issueTokens(user, meta)
  return { user, ...tokens }
}

export const logout = async (rawToken) => {
  if (!rawToken) return
  await RefreshToken.updateOne(
    { tokenHash: hashToken(rawToken) },
    { revoked: true }
  )
}
