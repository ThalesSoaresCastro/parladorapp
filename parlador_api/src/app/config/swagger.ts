const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Parlador API',
    description: 'API de cadastro de usuários e posts'
  },
  host: 'localhost:4004',
  schemes: ['http']
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./dist/src/routes.js'];

(async () => {
  await swaggerAutogen(outputFile, endpointsFiles, doc)
})()
