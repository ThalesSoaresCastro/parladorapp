/* eslint-disable camelcase */
import {
  Request,
  Response
} from 'express'

import { getRepository } from 'typeorm'

import User from '@models/User'

import ValidationValues from '@tools/validation_values'

interface NewUser{
    id:string;
    name:string;
    password?:string;
    created_at:Date;
}

class UserController {
  async delete_user (req: Request, res: Response) {
    const repository = getRepository(User)
    // verificando se email já existe
    const { email } = req.body

    if (!email) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_spaces(email)) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (email.length < 1) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_email(email)) {
      res.status(422).json({ message: 'Email format incorrect', data: {} })
      return
    }

    const userExists = await repository.findOne({ where: { email } })

    if (!userExists) {
      res.status(409).json({ message: 'User not exists' })
      return
    }

    try {
      const user = await repository.findOne({ where: { email } }) as User

      await repository.remove(user)
      // retirando password para enviar o user como retorno da requisição
      const user_return = user as NewUser
      delete user_return.password

      res.status(201).json({ message: 'deleted user', data: user_return })
    } catch {
      res.status(500).json({ message: 'Error to update user', data: {} })
    }
  }

  // --------------------------------------------------------------------------
  async update_user (req: Request, res: Response) {
    const repository = getRepository(User)

    // verificando se email já existe
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }
    if (!ValidationValues.validation_spaces(name) ||
      !ValidationValues.validation_spaces(email) ||
      !ValidationValues.validation_spaces(password)) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (name.length < 1 || email.length < 1 || password.length < 1) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_email(email)) {
      res.status(422).json({ message: 'Email format incorrect', data: {} })
      return
    }

    const userExists = await repository.findOne({ where: { id: req.params.id } })

    if (!userExists) {
      res.status(409).json({ message: 'User not exists' })
      return
    }

    // atualizar data
    const datenow = new Date().toISOString()

    try {
      await repository.update({ id: req.params.id },
        {
          name: name,
          email: email,
          password: password,
          edited_in: datenow
        })

      const user = await repository.findOne({ where: { email } })
      // retirando password para enviar o user como retorno da requisição
      const user_return = user as NewUser
      delete user_return.password

      res.status(201).json({ message: 'update user', data: user_return })
    } catch {
      res.status(500).json({ message: 'Error to update user', data: {} })
    }
  }

  // -------------------------------------------------------
  async get_user (req: Request, res: Response) {
    const repository = getRepository(User)

    const { email } = req.body

    if (!email || email.length <= 0) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_spaces(email)) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_email(email)) {
      res.status(422).json({ message: 'Email format incorrect', data: {} })
      return
    }

    const user = await repository.findOne({ where: { email } })

    if (!user) {
      res.status(200).json({
        message: 'User not exist',
        data: []
      })
      return
    }

    const user_return:NewUser = user

    // retirando os passwords...
    delete user_return.password

    res.status(200).json({
      message: 'User exist',
      data: user
    })
  }

  // -------------------------------------------------------
  async get_all (req: Request, res: Response) {
    const repository = getRepository(User)

    const users = await repository.find()

    if (!users) {
      res.status(200).json({
        message: 'Users not exists',
        data: []
      })
      return
    }

    const users_array:Array<NewUser> = users

    // retirando os passwords...
    // eslint-disable-next-line array-callback-return
    users_array.map((user) => {
      delete user.password
    })

    res.status(200).json({
      message: 'Users exists',
      data: users_array
    })
  }

  // -----------------------------------------------------------
  async store (req: Request, res: Response) {
    const repository = getRepository(User)

    // verificando se email já existe
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }
    if (!ValidationValues.validation_spaces(name) ||
      !ValidationValues.validation_spaces(email) ||
      !ValidationValues.validation_spaces(password)) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (name.length < 1 || email.length < 1 || password.length < 1) {
      res.status(422).json({ message: 'Data format incorrect', data: {} })
      return
    }

    if (!ValidationValues.validation_email(email)) {
      res.status(422).json({ message: 'Email format incorrect', data: {} })
      return
    }

    const userExists = await repository.findOne({ where: { email } })

    if (userExists) {
      res.status(409).json({ message: 'User exists' })
      return
    }

    // pegando a data atual para salvar no banco
    const datenow = new Date().toISOString()

    const user = repository.create({
      name: name,
      email: email,
      password: password,
      created_at: datenow
    })

    try {
      await repository.save(user).catch(
        (res) => console.log(res)
      )

      // retirando password para enviar o user como retorno da requisição
      const user_return:NewUser = user
      delete user_return.password

      res.status(201).json({ message: 'Created user', data: user_return })
    } catch {
      res.status(500).json({ message: 'Error to save user', data: {} })
    }
  }
}

export default new UserController()
