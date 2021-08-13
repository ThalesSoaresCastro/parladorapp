/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react';


import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Flex,
    Input,
    Heading,
    Button
  } from "@chakra-ui/react"

// import { Container } from './styles';

const pages: React.FC = () => {

    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    

    return(
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.700"  p={12} rounded={10}>
                <Heading>Cadastro</Heading>
                <Input placeholder="seu nome" variant="filled" mb={6} type="text" />
                <Input placeholder="seumail@mail.com" variant="filled" mb={3} type="email"/>
                <Input placeholder="*********" variant="filled" mb={6} type="password" />
            </Flex>
        </Flex>
    );
}

export default pages;