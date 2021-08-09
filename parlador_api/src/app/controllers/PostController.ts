import {
  Request,
  Response
} from 'express'

import { getRepository } from 'typeorm'

import Post from '@models/Post'
import User from '@models/User'

import ValidationValues from '@tools/validation_values'

interface NewUser{
  id?:string;
  name?:string;
  email?:string;
  password?:string;
  // eslint-disable-next-line camelcase
  created_at?:Date;
  posts?: Array<Post>
}

class PostController {
  async updatePost (req:Request, res: Response) {
    const repository = getRepository(Post)
    const userRepository = getRepository(User)

    const { post, userEmail } = req.body

    if (!post || !userEmail) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }
    if (!ValidationValues.validation_spaces(post) ||
          !ValidationValues.validation_spaces(userEmail)) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (post.length < 1 || userEmail.length < 1) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_email(userEmail)) {
      res.status(422).json({ message: 'Email format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_post(post)) {
      res.status(422).json({ message: 'Post must have a maximum of 280 characters', data: {} })
      return
    }

    const userExists = await userRepository.findOne({ where: { email: userEmail } })
    if (!userExists) {
      res.status(409).json({ message: 'User not exists' })
      return
    }

    const postExists = await repository.findOne({ where: { id: req.params.id } })
    if (!postExists) {
      res.status(409).json({ message: 'Post not exists' })
      return
    }

    // atualizar data
    const datenow = new Date().toISOString()

    try {
      await repository.update({ id: req.params.id },
        {
          text_post: post,
          edited_in: datenow,
          changed: true
        })

      // const user = await repository.findOne({ where: { email } })
      // retirando password para enviar o user como retorno da requisição
      // const user_return = user as NewUser
      // delete user_return.password
      const updateP = await repository.findOne({ where: { id: req.params.id } })

      res.status(201).json({ message: 'Success to update post', data: updateP })
    } catch {
      res.status(500).json({ message: 'Error to update user', data: {} })
    }

    // procurar user
  }

  async getall (req: Request, res: Response) {
    const repository = getRepository(Post)
    const userRepository = getRepository(User)

    const posts = await repository.find()
    const userP = await userRepository.find()

    if (!posts) {
      res.status(200).json({
        message: 'Users not exists',
        data: []
      })
      return
    }
    const listPosts:Array<NewUser> = userP

    const lp = listPosts.map((user) => {
      return user.posts?.map((p) => {
        return Object.assign(p,
          {
            user_email: user.email,
            user_name: user.name
          })
      })
    }).reduce((prev, curr) => { return [...prev as any, ...curr as any] })

    res.status(200).json({
      message: 'Posts exists',
      // data: posts
      data: lp
    })
  }

  async getAllPostUser (req: Request, res:Response) {
    const repository = getRepository(Post)
    const userRepository = getRepository(User)

    const { userEmail } = req.body
    if (!userEmail || userEmail.length <= 0) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }
    if (!ValidationValues.validation_spaces(userEmail)) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_email(userEmail)) {
      res.status(422).json({ message: 'Email format incorrect', data: {} })
      return
    }
    // procurar user
    const userExists = await userRepository.findOne({ where: { email: userEmail } })

    if (!userExists) {
      res.status(409).json({ message: 'User not exists' })
      return
    }

    const posts = await repository.find({ where: { user: userExists } })

    if (!posts) {
      res.status(200).json({
        message: 'Posts not exists',
        data: []
      })
      return
    }

    // eslint-disable-next-line camelcase
    const user_return = userExists as NewUser

    // retirando os passwords...
    delete user_return.password

    res.status(200).json({
      message: 'Success in fetching posts',
      data: user_return
      /*
      data: {
        user: user_return,
        list_posts: posts
      }
      */
    })
  }

  async postStore (req: Request, res: Response) {
    const repository = getRepository(Post)
    const userRepository = getRepository(User)

    const { post, userEmail } = req.body

    if (!post || !userEmail) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }
    if (!ValidationValues.validation_spaces(post) ||
          !ValidationValues.validation_spaces(userEmail)) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (post.length < 1 || userEmail.length < 1) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_email(userEmail)) {
      res.status(422).json({ message: 'Email format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_post(post)) {
      res.status(422).json({ message: 'Post must have a maximum of 280 characters', data: {} })
      return
    }

    // procurar user
    const userExists = await userRepository.findOne({ where: { email: userEmail } })

    if (!userExists) {
      res.status(409).json({ message: 'User not exists' })
      return
    }

    // pegando a data atual para salvar no banco
    const datenow = new Date().toISOString()

    const postmodel = repository.create({
      text_post: post,
      created_at: datenow,
      user: userExists
    })

    try {
      await repository.save(postmodel).catch(
        (res) => console.log(res)
      )

      // retirando password para enviar o user como retorno da requisição
      // const user_return:NewUser = user
      // delete user_return.password

      res.status(201).json({ message: 'Created post', data: postmodel })
      return
    } catch {
      res.status(500).json({ message: 'Error to save post', data: {} })
    }
  }
}

export default new PostController()
