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

import { userCreate } from '../services/userservice';
import Router from 'next/router';

const pages: React.FC = () => {

    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    

    return(
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.700"  p={12} rounded={10}>
                <Heading>Cadastro</Heading>
                <Input 
                    placeholder="seu nome" 
                    variant="filled" 
                    mb={6} 
                    type="text"
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                />
                <Input 
                    placeholder="seumail@mail.com"
                    variant="filled"
                    mb={3}
                    type="email"
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
                <Input 
                    placeholder="*********"
                    variant="filled"
                    mb={6}
                    type="password"
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                />

                <Button
                    colorScheme="orange"
                    onClick={async()=>{
                        const response = await userCreate({name:name, email:email, password:password})
                        
                        if(response.status === 201){
                            Router.push('/')
                        }else{
                            alert('Não foi possível efetuar o cadastro.\nVerifique as informações inseridas!');
                        }
                    }}
                >
                    Cadastrar
                </Button>
            </Flex>
        </Flex>
    );
}

export default pages;