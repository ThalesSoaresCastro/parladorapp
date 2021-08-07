import {
  Request,
  Response
} from 'express'

import { getRepository } from 'typeorm'

import Post from '@models/Post'

import validation_values from '@tools/validation_values'

class PostController {
  async postStore (req: Request, res: Response) {
    const repository = getRepository(Post)

    const { post, user_id } = req.body

    return res.status(201).json({ message: 'Success to created post' })
  }
}
