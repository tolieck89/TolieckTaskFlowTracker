const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Привіт з бекенду! 🚀')
})

app.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000')
})
