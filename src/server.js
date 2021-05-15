require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const todoRoutes = require('./routes/todos')
const authRoutes = require('./routes/auth')
const verifyJWT = require('./middlewares/auth')

app.use(express.json())

app.use(cors())

app.use('/auth', authRoutes)
app.use(verifyJWT)
app.use(todoRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`)
})