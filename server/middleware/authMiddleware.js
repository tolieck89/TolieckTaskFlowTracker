import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { JWT_SECRET } from '../config.js'

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
const decoded = jwt.verify(token, JWT_SECRET)
console.log('🔐 Authorization header:', req.headers.authorization)


      const user = await User.findById(decoded.id).select('-password')
      if (!user) return res.status(401).json({ message: 'Користувача не знайдено' })

      req.user = user
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Недійсний токен' })
    }
  } else {
    return res.status(401).json({ message: 'Токен відсутній' })
  }
}

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Доступ заборонено' })
    }
    next()
  }
}
