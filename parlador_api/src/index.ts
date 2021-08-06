/* eslint-disable camelcase */
import 'dotenv/config'

import 'reflect-metadata'
import express from 'express'

import './database/connect'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

const port_server = 4004

app.listen(port_server, () => console.log(`Server run in http://localhost:${port_server}!\n`))
