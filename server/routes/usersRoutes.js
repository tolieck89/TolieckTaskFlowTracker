import express from 'express'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/usersController.js'
import { protect, allowRoles } from '../middleware/authMiddleware.js'
import { getProfile } from '../controllers/usersController.js'

const router = express.Router()

router.get('/', getUsers) 

router.post('/', createUser) 
router.post('/login', loginUser) 

router.put('/:id', protect, allowRoles('admin'), updateUser) 
router.delete('/:id', protect, allowRoles('admin'), deleteUser) 
router.get('/me', protect, getProfile) 

export default router
