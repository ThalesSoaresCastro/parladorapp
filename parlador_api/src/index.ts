/* eslint-disable camelcase */
import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import morganMiddleware from '@middlewares/morganMiddleware'

import fetch from 'node-fetch'

import CreateData from '@tools/createdata'

import createConnect from './database/connect'
import routes from './routes'

import swaggerFile from '../swagger_output.json'

createConnect()

const app = express()

const port_server = 4004

app.use(express.json())

app.use(morganMiddleware)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  app.use(cors)
  next()
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

// Criando dados fake
// const datacreate = async () => { await CreateData.createPosts() }
// datacreate()
const datacreate = async () => {
  // inserindo 3 usuários com 4 posts para cada e apagando os dados existentes
  await CreateData.createFakerDataUserPost(3, 4, true)

  await new Promise(resolve => { setTimeout(resolve, 2000) })

  const elementadd = {
    name: 'Rafel Admin',
    email: 'raf.admin@mail.com',
    password: 'password'
  }

  const addUser = async () => {
    const rawResponse = await fetch('http://localhost:4004/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(elementadd)
    })
    await rawResponse.json()
    console.log('\n\nUser Criado para teste: ', JSON.stringify(elementadd))
  }
  await addUser()
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(port_server, () => console.log(`Server run in http://localhost:${port_server}!\n`))
  datacreate()
}

export default app
