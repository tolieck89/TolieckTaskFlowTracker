import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Назва проєкту обовʼязкова'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    issueTypes: {
  type: [String], 
  required: true,
  default: ['task'], 
},

  },
  {
    timestamps: true, 
  }
)

const Project = mongoose.model('Project', projectSchema)

export default Project
