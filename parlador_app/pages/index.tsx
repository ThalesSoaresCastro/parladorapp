import Head from 'next/head'
import Image from 'next/image'

import{
  Flex,
  Heading,
  Input,
  Button,
  Link
} from '@chakra-ui/react'

import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Flex direction="column" background="gray.700"  p={12} rounded={6} >
      <Heading mb={4}> Logar </Heading>
      <Input placeholder="seumail@mail.com" variant="filled" mb={3} type="email"/>
      <Input placeholder="*********" variant="filled" mb={6} type="password" />
      <Button colorScheme="orange"> Logar </Button>
      <Flex alignItems="center" justifyContent="center">
        <Link color="orange"  onClick={ () => router.push('/cadastrar')} >Cadastre-se</Link>
      </Flex>
    </Flex>
  </Flex>
    )
}
