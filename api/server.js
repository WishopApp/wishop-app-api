import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import router from './router'
import './libaries/mongoose'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/', router)

const PORT = process.env.APP_PORT

app.listen(PORT, () => {
  console.log(`API RUNNING AT PORT: ${PORT}`)
})
