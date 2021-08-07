import { createConnection } from 'typeorm'

const createConnect = async () => {
  return await createConnection().then(() => console.log('Sucessfully connected with database!!\n'))
}
export default createConnect
