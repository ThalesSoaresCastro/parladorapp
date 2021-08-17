/* eslint-disable react-hooks/rules-of-hooks */
import React, { 
    useContext,
    useState,
    useEffect,
} from 'react';

import {
    Flex,
    Box,
    Text,
    Textarea,
    Heading,
    Input,
    Button,
    FormLabel,
    FormControl,
    useToast,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

import {
    CreatePost
} from '../services/postservice';

import SidebarWithHeader from '../components/sidebar'


import AuthContext from '../contexts/auth/auth';

const criarpost: React.FC = () => {

    const toast = useToast()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [post, setPost] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(AuthContext)

    //console.log('user: ',user);

    const validatePost = (value:string) =>{
        let error;

        if(!value){
            error = "Necessário que algo seja digitado para postagem."
        }
        else if(!value.split(' ').join('')){
            error = "Post não pode conter apenas espaços."
        }
        return error
    } 

    const criapost = async(post:string)=>{
        const objPost = {
            post:post,
            userEmail: user?.email as string 
        }

        const response = await CreatePost(objPost);
        let result = {
            status: '',
            msg:'',
        };

        if(response.status === 201){
            result.status="sucess";
            result.msg = "Post criado com sucesso!";
        }else{
            result.status = "error";
            result.msg = "Erro ao criar o post\n, tente novamente mais tarde!"
        }
        return result;
        

    }

    return(

        <SidebarWithHeader>

            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" w='100vh' h='100vh' alignItems='center' pt={12} pe={12}>
                    
                <Heading>Nova Postagem</Heading>
                    <Textarea 
                        mt={4} mb={4}
                        placeholder="Digite o que você está pesando."
                        //variant="filled" 
                        //errorBorderColor="red.300"
                        focusBorderColor="orange.300"
                        isRequired
                        h={200}
                        value={post}
                        onChange={e => {setPost(e.target.value)}}
                    />
                    <Button
                        mt={4} mb={4}
                        colorScheme="orange"
                        type="submit"
                        onClick={async() =>{
                            let validate = validatePost(post)
                            if(validate){ alert(validate); setPost(''); return}
                            let responsePost = await criapost(post)

                            alert(responsePost.msg)

                        }}
                    >
                        Enviar
                    </Button>
                </Flex>

            </Flex>
        </SidebarWithHeader>
    );
}

export default criarpost;