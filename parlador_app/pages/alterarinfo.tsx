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
   updateUser, 
} from '../services/userservice';

import SidebarWithHeader from '../components/sidebar'


import AuthContext from '../contexts/auth/auth';

const alterarinfo: React.FC = () => {

    const toast = useToast()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [post, setPost] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(AuthContext)

    const [name, setName] = useState(user?.name as string)
    const [email, setEmail] = useState(user?.email as string)
    const [password, setPassword] = useState(user?.password as string)
    

    const alteraUser = async(name:string, email:string,
                            password:string, user:any)=>{
        
        const objUser = {
            name: (name && name !== '' ? name : user.name),
            email: (email && email !== '' ? email :  user.email),
            password: (password && password !== '' ? password: user.password) 
        }

        console.log('userobj: ', objUser,'\n\n iduser: ', user.id)

        const response = await updateUser(objUser, user.id);
        console.log('Response: ', response)

        let result = {
            status: '',
            msg:'',
        };

        if(response.status === 201){
            result.status="sucess";
            result.msg = "Infos atualizadas com sucesso!";
        }else{
            result.status = "error";
            result.msg = "Erro ao atualizar as informações\n, tente novamente mais tarde!"
        }
        return result;
        
    }

    return(

        <SidebarWithHeader>

            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" w='60vh' h='100vh' alignItems='center' pt={12} pe={12}>    
                    <Heading>Alterar Informações</Heading>
                    <Input
                        mt={2}
                        isRequired
                        focusBorderColor="orange.300" 
                        placeholder={user?.name} 
                        variant="filled" 
                        mb={6} 
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}
                    />
                    <Input 
                        placeholder={user?.email}
                        isRequired
                        variant="filled"
                        focusBorderColor="orange.300"
                        mb={6}
                        type="email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                    <Input 
                        placeholder="*********"
                        variant="filled"
                        focusBorderColor="orange.300"
                        isRequired
                        mb={6}
                        value={password}
                        type="password"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <Button
                        mt={4} mb={4}
                        colorScheme="orange"
                        type="submit"
                        onClick={async() =>{
                            //let validate = validatePost(post)
                            //if(validate){ alert(validate); setPost(''); return}
                            let responsePost = await alteraUser(
                                                name,
                                                email,
                                                password,
                                                user
                                            )
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

export default alterarinfo;