/* eslint-disable camelcase */
import 'dotenv/config'

import 'reflect-metadata'
import express from 'express'

import morganMiddleware from '@middlewares/morganMiddleware'

import createConnect from './database/connect'
import routes from './routes'

createConnect()

const app = express()

app.use(express.json())

app.use(morganMiddleware)

app.use(routes)

const port_server = 4004

app.listen(port_server, () => console.log(`Server run in http://localhost:${port_server}!\n`))

export default app
