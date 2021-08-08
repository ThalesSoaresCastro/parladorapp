import request from 'supertest'
import app from '../../src/index'
import createConnect from '../../src/database/connect'

import { getRepository } from 'typeorm'
import User from '@models/User'

let token:string
let idTest:string
beforeAll(async () => {
  await createConnect()

  // add user to token
  const repository = getRepository(User)
  const dataElement = new Date().toISOString()
  const element = {
    name: 'admin',
    email: 'admin@mail.com',
    password: 'admin',
    created_at: dataElement
  }
  const adminElement = repository.create(element)

  await repository.save(adminElement).catch(
    res => console.log(res)
  )

  // auth element
  const resp = await request(app)
    .post('/auth')
    .send({
      email: element.email,
      password: element.password
    })

  idTest = resp.body.data.user.id
  token = resp.body.data.token
})

afterAll(async () => {
  const repository = getRepository(User)

  const arrRep:Array<User> = await repository.find()

  await repository.remove(arrRep)
})

describe('Teste User Controller', () => {
  describe('Insert User', () => {
    test('Register User Incorrect email local empty', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          name: 'Rafael',
          email: '@teste.com',
          password: 'password'
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User Incorrect email domain empty', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          name: 'Rafael',
          email: 'teste@',
          password: 'password'
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User Incorrect name empty', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          name: '',
          email: 'teste@',
          password: 'password'
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User Incorrect email empty', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          name: 'teste',
          email: '',
          password: 'password'
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User Incorrect password empty', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          name: 'teste',
          email: 'teste@teste@gmail.com',
          password: ''
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User Incorrect password not exists', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          name: 'teste',
          email: 'teste@teste@gmail.com'
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User Incorrect email not exists', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          name: 'teste',
          password: 'password'
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User Incorrect name not exists', async () => {
      const resp = await request(app)
        .post('/users')
        .send({
          email: 'teste@teste@gmail.com',
          password: 'password'
        })
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Register User correct insert', async () => {
      const element = {
        name: 'teste',
        email: 'teste@gmail.com',
        password: 'password'
      }

      const resp = await request(app)
        .post('/users')
        .send(element)
      expect(resp.statusCode).toEqual(201)
      expect(resp.body.data.email).toEqual(element.email)
      expect(resp.body.data.name).toEqual(element.name)
    })

    test('Register User incorrect, user exists', async () => {
      const element = {
        name: 'teste',
        email: 'teste@gmail.com',
        password: 'password'
      }

      const element2 = element

      await request(app)
        .post('/users')
        .send(element)

      const resp = await request(app)
        .post('/users')
        .send(element2)
      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('User exists')
    })
  })

  describe('Get One User', () => {
    test('Get user email empty', async () => {
      const user = {
        email: ''
      }

      const resp = await request(app)
        .post('/getuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Get user email not exists', async () => {
      const user = {
      }

      const resp = await request(app)
        .post('/getuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.data).toEqual({})
    })

    test('Get user not exists', async () => {
      const user = {
        email: 'teste@mail.com'
      }

      const resp = await request(app)
        .post('/getuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(200)
      expect(resp.body.message).toContain('User not exist')
    })

    test('Get user email format incorrect', async () => {
      const user = {
        email: '@mail.com'
      }

      const resp = await request(app)
        .post('/getuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Email format incorrect')
    })

    test('Get user correct', async () => {
      const user = {
        email: 'admin@mail.com'
      }

      const resp = await request(app)
        .post('/getuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(200)
      expect(resp.body.message).toContain('User exist')
      expect(resp.body.data.email).toEqual(user.email)
    })
  })

  describe('Get All', () => {
    test('Test route', async () => {
      const res = await request(app)
        .get('/users')
        .auth(token, { type: 'bearer' })

      expect(res.statusCode).toEqual(200)
    })
  })

  describe('Update User', () => {
    test('User id incorrect', async () => {
      const userTest = {
        name: 'admin',
        email: 'adminatual@mail.com',
        password: 'admin'
      }
      const idInc = '51f03bf7-5f0b-3b14-a509-6a278edb7edc'

      const resp = await request(app)
        .post(`/updateuser/${idInc}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('User not exists')
    })

    test('User name empty', async () => {
      const userTest = {
        name: '',
        email: 'adminatual@mail.com',
        password: 'admin'
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('User email empty', async () => {
      const userTest = {
        name: 'admin',
        email: '',
        password: 'admin'
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('User password empty', async () => {
      const userTest = {
        name: 'admin',
        email: 'adminatual@mail.com',
        password: ''
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('User email not exists', async () => {
      const userTest = {
        name: 'admin',
        password: 'admin'
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('User name not exists', async () => {
      const userTest = {
        email: 'adminatual@mail.com',
        password: 'admin'
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('User password not exists', async () => {
      const userTest = {
        name: 'admin',
        email: 'adminatual@mail.com'
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('User email format invalid', async () => {
      const userTest = {
        name: 'admin',
        email: 'adminatual',
        password: 'admin'
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Email format incorrect')
    })

    test('User update success', async () => {
      const userTest = {
        name: 'admin',
        email: 'adminatual@mail.com',
        password: 'admin'
      }

      const resp = await request(app)
        .post(`/updateuser/${idTest}`)
        .auth(token, { type: 'bearer' })
        .send(userTest)

      expect(resp.statusCode).toEqual(201)
      expect(resp.body.message).toContain('update user')
      expect(resp.body.data.email).toEqual(userTest.email)
      expect(resp.body.data.name).toEqual(userTest.name)
    })
  })

  describe('Delete User', () => {
    test('Delete user email empty', async () => {
      const user = {
        email: ''
      }

      const resp = await request(app)
        .post('/deleteuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Delete user email not exists', async () => {
      const user = {
      }

      const resp = await request(app)
        .post('/deleteuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Delete user email format incorrect', async () => {
      const user = {
        email: '@mail.com'
      }

      const resp = await request(app)
        .post('/deleteuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Email format incorrect')
    })

    test('Delete user not exists', async () => {
      const user = {
        email: 'teste@mail.com'
      }

      const resp = await request(app)
        .post('/deleteuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('User not exists')
    })

    test('Delete user success', async () => {
      const user = {
        email: 'testadd@mail.com'
      }
      const repository = getRepository(User)
      const dataElement = new Date().toISOString()

      const element = {
        name: 'test',
        email: 'testadd@mail.com',
        password: 'testadd',
        created_at: dataElement
      }
      const adminElement = repository.create(element)
      await repository.save(adminElement).catch(
        res => console.log(res)
      )

      const resp = await request(app)
        .post('/deleteuser')
        .auth(token, { type: 'bearer' })
        .send(user)

      expect(resp.statusCode).toEqual(201)
      expect(resp.body.message).toContain('deleted user')
      expect(resp.body.data.name).toEqual(element.name)
      expect(resp.body.data.email).toEqual(element.email)
    })
  })
})
