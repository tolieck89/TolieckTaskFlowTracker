import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/usersRoutes.js'
import projectRoutes from './routes/projectsRoutes.js'
import taskRoutes from './routes/tasksRoutes.js'


dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('Привіт з бекенду! 🚀')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`)
})
