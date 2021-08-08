import {
  Request,
  Response
} from 'express'

import { getRepository } from 'typeorm'

import Post from '@models/Post'
import User from '@models/User'

import ValidationValues from '@tools/validation_values'

class PostController {
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
