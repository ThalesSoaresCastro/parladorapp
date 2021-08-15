import {
  useState,
  useContext
} from 'react'

import{
  Flex,
  Heading,
  Input,
  Button,
  Link
} from '@chakra-ui/react'

import { useRouter } from 'next/router'

import AuthContext from '../contexts/auth/auth'

interface LoginUser{
  email:string;
  password:string;
}

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const { signed, signIn, user } = useContext(AuthContext);


  async function handleLogin(loginObj:LoginUser){
   try {
    await signIn(loginObj); 
   } catch (error) {
     alert('Nao foi possível se comunicar com o servidor');
   }
    
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Flex direction="column" background="gray.700"  p={12} rounded={6} >
      <Heading mb={4}> Logar </Heading>
      <Input 
        placeholder="seumail@mail.com"
        variant="filled" 
        mb={3} 
        type="email"
        onChange={async (e) => {setEmail(e.target.value)}}
      />
      <Input 
        placeholder="*********"
        variant="filled"
        mb={6}
        type="password"
        onChange={async (e) => {setPassword(e.target.value)}}
      />
      <Button colorScheme="orange"
        onClick={() =>{
          handleLogin({email,password});
        }}
      > 
        Logar 
      </Button>
      <Flex alignItems="center" justifyContent="center">
        <Link color="orange"  onClick={ () => router.push('/cadastrar')} >Cadastre-se</Link>
      </Flex>
    </Flex>
  </Flex>
    )
}
