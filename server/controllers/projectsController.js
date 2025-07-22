import Project from '../models/projectModel.js'
import mongoose from 'mongoose'


export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні проєктів' })
  }
}

export const getProjectById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Невалідний ID проєкту' })
  }

  try {
    const project = await Project.findById(id)

    if (!project) {
      return res.status(404).json({ message: 'Проєкт не знайдено' })
    }

    res.json(project)
  } catch (error) {
    console.error('Помилка при отриманні проєкту:', error)
    res.status(500).json({ message: 'Серверна помилка при пошуку проєкту' })
  }
}

export const updateProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Невалідний ID проєкту' })
  }

  try {
    const project = await Project.findById(id)

    if (!project) {
      return res.status(404).json({ message: 'Проєкт не знайдено' })
    }

    project.title = req.body.title || project.title
    project.description = req.body.description || project.description

    const updated = await project.save()

    res.json(updated)
  } catch (error) {
    console.error('Помилка при оновленні проєкту:', error)
    res.status(500).json({ message: 'Серверна помилка при оновленні' })
  }
}


export const deleteProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Невалідний ID проєкту' })
  }

  try {
    const project = await Project.findById(id)

    if (!project) {
      return res.status(404).json({ message: 'Проєкт не знайдено' })
    }

    await project.deleteOne()

    res.json({ message: 'Проєкт успішно видалено' })
  } catch (error) {
    console.error('Помилка при видаленні проєкту:', error)
    res.status(500).json({ message: 'Серверна помилка при видаленні проєкту' })
  }
}


export const createProject = async (req, res) => {
  try {
    const { title, description, issueTypes } = req.body

    if (!title || !issueTypes?.length) {
      return res.status(400).json({ message: 'Назва і типи задач обовʼязкові' })
    }

    const newProject = new Project({
      title,
      description,
      issueTypes,
      createdBy: req.user.id,
    })

    const savedProject = await newProject.save()
    res.status(201).json(savedProject)
  } catch (error) {
    console.error('Помилка при створенні проєкту:', error)
    res.status(500).json({ message: 'Серверна помилка при створенні проєкту' })
  }
}

