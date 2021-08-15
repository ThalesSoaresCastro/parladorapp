import request from 'supertest'
import app from '../../src/index'
import createConnect from '../../src/database/connect'
import { getRepository } from 'typeorm'

import Post from '@models/Post'
import User from '@models/User'

let token:string
// let idTest:string
let idPost:string
let idPostDelete:string

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

  // created post

  const postRepository = getRepository(Post)
  const userpost = await repository.findOne({ where: { email: elementpost.email } })

  if (userpost) {
    const postTest = postRepository.create({
      text_post: 'teste post created',
      created_at: new Date().toISOString(),
      user: userpost
    })
    await postRepository.save(postTest).catch(
      resp => console.log('add post test beforeall: ', resp)
    )

    idPost = postTest.id
  }

  // ----------------------------------------------------------------

  // add second user
  const elementpost2 = {
    name: 'adminpostsecond',
    email: 'adminpostsecond@mail.com',
    password: 'adminpostsecond',
    created_at: new Date().toISOString()
  }
  const adminElementPost2 = repository.create(elementpost2)

  await repository.save(adminElementPost2).catch(
    res => console.log(res)
  )

  const userpost2 = await repository.findOne({ where: { email: elementpost2.email } })

  if (userpost2) {
    const postTest2 = postRepository.create({
      text_post: 'teste post created for second user',
      created_at: new Date().toISOString(),
      user: userpost2
    })
    await postRepository.save(postTest2).catch(
      resp => console.log('add post test beforeall - second user: ', resp)
    )
    idPostDelete = postTest2.id
  }

  // ---------------------------------------------------------------
})

afterAll(async () => {
  const repository = getRepository(User)

  // const arrRep:Array<User> = await repository.find()

  // await repository.remove(arrRep)
  const userpost = await repository.findOne({ where: { email: 'adminpost@mail.com' } }) as User
  await repository.remove(userpost)
})

describe('Tests of PostsController', () => {
  describe('Remove posts Tests', () => {
    test('Error idPost not exists', async () => {
      const obj = {
      }

      const resp = await request(app)
        .post('/deletepost')
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Error idPost is space', async () => {
      const obj = {
        idpost: '              '
      }

      const resp = await request(app)
        .post('/deletepost')
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Error idPost is empty', async () => {
      const obj = {
        idpost: ''
      }

      const resp = await request(app)
        .post('/deletepost')
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Error id incorrect post', async () => {
      const obj = {
        idpost: '51f03bf7-5f0b-3b14-a509-6a278edb7edc'
        // idpost: idPost
      }

      const resp = await request(app)
        .post('/deletepost')
        .auth(token, { type: 'bearer' })
        .send(obj)

      // console.log('res: ', resp.body)
      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('Post not exists')
    })

    test('Correct delete post', async () => {
      const obj = {
        idpost: idPostDelete
      }

      const resp = await request(app)
        .post('/deletepost')
        .auth(token, { type: 'bearer' })
        .send(obj)

      // console.log('res: ', resp.body)
      expect(resp.statusCode).toEqual(200)
      expect(resp.body.message).toContain('Success to post deleted')
    })
  })
  describe('Update Post tests', () => {
    test('Update post correct', async () => {
      const obj = {
        post: 'tests of update posts correct',
        userEmail: 'adminpost@mail.com'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(201)
      expect(resp.body.message).toContain('Success to update post')
    })

    test('Error post id not exists', async () => {
      const obj = {
        post: 'tests of update posts',
        userEmail: 'adminpost@mail.com'
      }

      const idIncPost = '51f03bf7-5f0b-3b14-a509-6a278edb7edc'

      const resp = await request(app)
        .post(`/updatepost/${idIncPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('Post not exists')
    })

    test('Error user not exists', async () => {
      const obj = {
        post: 'tests of update posts',
        userEmail: 'adminpostnotexists@mail.com'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('User not exists')
      // expect(resp.statusCode).toEqual(422)
      // expect(resp.body.message).toContain('Post must have a maximum of 280 characters')
    })

    test('Error posts is bigger', async () => {
      const obj = {
        post: 'te'.repeat(200),
        userEmail: 'adminpost@mail.com'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Post must have a maximum of 280 characters')
    })

    test('Error email format incorrect', async () => {
      const obj = {
        post: 'teste update posts',
        userEmail: '@mail.com'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Email format incorrect')
    })

    test('Error Email is spaces', async () => {
      const obj = {
        post: 'teste update posts',
        userEmail: '  '
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Error Post is spaces', async () => {
      const obj = {
        post: '             ',
        userEmail: 'adminpost@mail.com'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Email not exists', async () => {
      const obj = {
        post: 'post update test'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Post not exists', async () => {
      const obj = {
        userEmail: 'adminpost@mail.com'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Email user empty', async () => {
      const obj = {
        post: 'post update',
        userEmail: ''
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })

    test('Post empty', async () => {
      const obj = {
        post: '',
        userEmail: 'adminpost@mail.com'
      }

      const resp = await request(app)
        .post(`/updatepost/${idPost}`)
        .auth(token, { type: 'bearer' })
        .send(obj)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })
  })

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

    test('Incorrect post is bigger size', async () => {
      const datapost = {
        post: 'te'.repeat(300),
        userEmail: 'adminpost@mail.com'
      }
      const resp = await request(app)
        .post('/createpost')
        .auth(token, { type: 'bearer' })
        .send(datapost)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Post must have a maximum of 280 characters')
      // console.log('body: ', resp3.body.data.user.posts.length)
    })
  })

  describe('Get all Tests', () => {
    test('Get all correct', async () => {
      const resp = await request(app)
        .get('/allposts')
        .auth(token, { type: 'bearer' })

      expect(resp.statusCode).toEqual(200)
      expect(resp.body.message).toContain('Posts exists')
    })
  })

  describe('Get All Post User tests', () => {
    test('Correct getall posts ', async () => {
      const userPost = {
        userEmail: 'adminpost@mail.com'
      }

      const resp = await request(app)
        .post('/getallpostuser')
        .auth(token, { type: 'bearer' })
        .send(userPost)

      // console.log('user: ', resp.body.data.user.posts)
      // console.log('posts: ', resp.body.data.list_posts)
      expect(resp.statusCode).toEqual(200)
      expect(resp.body.message).toContain('Success in fetching posts')
    })

    test('Error User not exists ', async () => {
      const userPost = {
        userEmail: 'notuserexists@mail.com'
      }

      const resp = await request(app)
        .post('/getallpostuser')
        .auth(token, { type: 'bearer' })
        .send(userPost)

      expect(resp.statusCode).toEqual(409)
      expect(resp.body.message).toContain('User not exists')
    })

    test('Error email format incorrect ', async () => {
      const userPost = {
        userEmail: '@mail.com'
      }

      const resp = await request(app)
        .post('/getallpostuser')
        .auth(token, { type: 'bearer' })
        .send(userPost)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Email format incorrect')
    })

    test('Error Email not exists ', async () => {
      const userPost = {
      }

      const resp = await request(app)
        .post('/getallpostuser')
        .auth(token, { type: 'bearer' })
        .send(userPost)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })
    test('Error Email empty ', async () => {
      const userPost = {
        userEmail: ''
      }

      const resp = await request(app)
        .post('/getallpostuser')
        .auth(token, { type: 'bearer' })
        .send(userPost)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })
    test('Error Email is spaces ', async () => {
      const userPost = {
        userEmail: '                '
      }

      const resp = await request(app)
        .post('/getallpostuser')
        .auth(token, { type: 'bearer' })
        .send(userPost)

      expect(resp.statusCode).toEqual(422)
      expect(resp.body.message).toContain('Data format incorrect')
    })
  })
})
