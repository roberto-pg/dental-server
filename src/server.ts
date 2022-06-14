import cors from 'cors'
import express from 'express'
import { router } from './routes'
import 'dotenv/config'

const port = process.env.PORT || 3335

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.listen(port, () => console.log(`Server started at Port ${port}`))
