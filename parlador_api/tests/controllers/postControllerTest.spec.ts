import request from 'supertest'
import app from '../../src/index'
import createConnect from '../../src/database/connect'
import { getRepository } from 'typeorm'
// import Post from '@models/Post'

import User from '@models/User'

let token:string
// let idTest:string
beforeAll(async () => {
  await createConnect()

  // add user to token
  const repository = getRepository(User)
  const dataElement = new Date().toISOString()
  const elementpost = {
    name: 'adminpost',
    email: 'adminpost@mail.com',
    password: 'adminpost',
    created_at: dataElement
  }
  const adminElementPost = repository.create(elementpost)

  await repository.save(adminElementPost).catch(
    res => console.log(res)
  )

  // auth element
  const resp = await request(app)
    .post('/auth')
    .send({
      email: elementpost.email,
      password: elementpost.password
    })

  // idTest = resp.body.data.user.id
  token = resp.body.data.token
})

afterAll(async () => {
  const repository = getRepository(User)

  // const arrRep:Array<User> = await repository.find()

  // await repository.remove(arrRep)
  const userpost = await repository.findOne({ where: { email: 'adminpost@mail.com' } }) as User
  await repository.remove(userpost)
})

describe('Tests of PostsController', () => {
  describe('Create post tests', () => {
    test('Text post empty', async () => {
      const datapost = {
        post: '',
        userEmail: 'admin@mail.com'
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })
    test('Text email empty', async () => {
      const datapost = {
        post: 'teste post',
        userEmail: ''
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })
    test('Text email param not exists', async () => {
      const datapost = {
        post: 'teste post'
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })
    test('Text post param not exists', async () => {
      const datapost = {
        userEmail: 'admin@mail.com'
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Text post is space', async () => {
      const datapost = {
        post: '         ',
        userEmail: 'admin@mail.com'
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Text email is space', async () => {
      const datapost = {
        post: 'teste post',
        userEmail: '      '
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Text email format invalid', async () => {
      const datapost = {
        post: 'teste post',
        userEmail: '@mail.com'
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Email format incorrect')
    })

    test('Text email user not exists', async () => {
      const datapost = {
        post: 'teste post',
        userEmail: 'notexistsuser@mail.com'
      }

      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)
      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('User not exists')
    })

    test('Text email and post correct', async () => {
      const datapost = {
        post: 'teste post',
        userEmail: 'adminpost@mail.com'
      }
      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)

      expect(resp.statusCode).toEqual(201)
      expect(resp.body.message).toContain('Created post')
      expect(resp.body.data.user.email).toEqual(datapost.userEmail)
      // console.log('body: ', resp3.body.data.user.posts.length)
    })
  })
})
