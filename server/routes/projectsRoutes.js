import express from 'express'
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllProjects)
router.get('/:id', getProjectById)
router.post('/', protect, createProject) 
router.put('/:id', protect, updateProject)
router.delete('/:id', protect, deleteProject)

export default router
