const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const todoRoutes = require('./routers/todo')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/todos', todoRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
