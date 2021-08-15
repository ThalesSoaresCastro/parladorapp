
import * as faker from 'faker'
import createConnect from '../../database/connect'
import { getRepository } from 'typeorm'
import User from '@models/User'
import Post from '@models/Post'

// import request from 'supertest'

// import app from '../../index'

class CreateData {
  async createFakerDataUserPost (numUsers:number = 2, numPosts:number = 2, apagarDados:boolean = true) {
    // -----------------------------------------------------

    await createConnect()

    const repositoryUser = getRepository(User)

    const verifyData:Array<User> = await repositoryUser.find()

    // Verificando se já existem dados para serem usados como teste
    if (verifyData.length > 0 && apagarDados === false) {
      console.log('Já existem dados para serem usados para teste: \n\n')
      verifyData.map((user:User) => {
        return console.log(`user: ${JSON.stringify(user)}\n`)
      })
      return
    }
    // apagando dados existente no banco...
    const arrRep:Array<User> = await repositoryUser.find()
    await repositoryUser.remove(arrRep)

    // Fazendo inserção dos dados...
    const postRepository = getRepository(Post)

    const arrUsers: Array<User> = []
    const arrElements:Array<any> = []

    for (let i = 0; i < numUsers; i++) {
      // criando elemento
      const elementU = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        created_at: new Date().toISOString()
      }
      arrElements.push(elementU)

      // criando e inserindo os elementos
      const elementUser = repositoryUser.create(elementU)

      const respUser = await repositoryUser.save(elementUser).catch(
        res => {
          console.log(`Add element ${i + 1}: `, res)
          return res
        }
      )

      console.log(`User ${i + 1}: \n ${JSON.stringify(elementU)} \n`)

      arrUsers.push(respUser)
    }

    // await userArrays.map(async (user:any) => {
    await arrUsers.map(async (user:User) => {
      for (let p = 0; p < numPosts; p++) {
        // criando posts
        const postC = postRepository.create({
          text_post: faker.lorem.words(),
          created_at: new Date().toISOString(),
          user: user
        })
        // salvando posts
        const respP = await postRepository.save(postC).catch(
          resp => {
            console.log(`Add post ${p + 1} : ${resp}`)
            return resp
          }
        )

        console.log('Dados Fake Criados\n(senha criptografada, verificar senha no log acima[USER]): \n\n', {
          user: user,
          post_add: {
            respP
          }
        })
      }
    })
  }
}

export default new CreateData()
