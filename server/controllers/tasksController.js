import Task from '../models/taskModel.js'
import mongoose from 'mongoose'

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      type,
      priority,
      status,
      assignedTo,
      tags
    } = req.body

    if (!title || !projectId || !type) {
      return res.status(400).json({ message: 'Обовʼязкові поля: title, projectId, type' })
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Невалідний ID проєкту' })
    }

    const task = new Task({
      title,
      description,
      projectId,
      type,
      priority,
      status,
      assignedTo,
      createdBy: req.user.id, 
    })

    const saved = await task.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error('❌ Помилка при створенні задачі:', err.message)
    res.status(500).json({ message: 'Серверна помилка при створенні задачі' })
  }
}

export const getTasks = async (req, res) => {
  try {
    const { status, priority, projectId, assignedTo } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (projectId) filter.projectId = projectId;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (req.query.tag) {filter.tags = req.query.tag;
}

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Помилка при отриманні задач:', error);
    res.status(500).json({ message: 'Помилка при отриманні задач' });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Задачу не знайдено' })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Помилка при пошуку задачі' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Задачу не знайдено' })
    }

    const allowedFields = [
      'title',
      'description',
      'status',
      'priority',
      'assignedTo',
      'type',
      'projectId',
      'updatedBy',
      'tags',
    ]

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field]
      }
    })

    task.updatedAt = new Date()

    const updatedTask = await task.save()
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error('Помилка при оновленні задачі:', error)
    res.status(500).json({ message: 'Помилка при оновленні задачі' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Задачу не знайдено' })
    }

    await task.deleteOne()

    res.status(200).json({ message: 'Задача успішно видалена' })
  } catch (error) {
    console.error('Помилка при видаленні задачі:', error)
    res.status(500).json({ message: 'Помилка при видаленні задачі' })
  }
}

