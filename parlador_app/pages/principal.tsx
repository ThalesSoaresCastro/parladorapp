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
} from '@chakra-ui/react'

import SidebarWithHeader from '../components/sidebar'

import {ChatIcon } from '@chakra-ui/icons'

import {
    FiMessageSquare,
    FiUser,
  } from 'react-icons/fi';


import AuthContext from '../contexts/auth/auth';
import{
    ListAllPosts
} from '../services/postservice'

const principal: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [posts, setPosts] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(AuthContext)

    useEffect(()=>{
        async function postsRequest() {
            const response = await ListAllPosts()
            //console.log('response: ', response)
            if(response.status === 200){
                await setPosts(response.data.data)
            }
        }
        postsRequest()
    },[])

    //console.log('Post: ', new Date(posts[0]?.created_at) )

    const formatData = (data:string) =>{
        
        const data_convert : Date = new Date(data)   
        return(
            `${data_convert.getDate()}/${data_convert.getMonth()}/${data_convert.getFullYear()}  às ${data_convert.getHours()}:${data_convert.getMinutes()}`
        );
    }

    const postElement = (post:any) =>{
        //console.log(post)
        return(
            <Box direction="column" background="gray.700"  boxShadow="2xl" p={8} rounded={6} w='90%' margin={2}>    
                <Flex direction='row-reverse'>
                    <Text marginLeft={4} color="orange" > {post?.changed? 'Editado' : '' } </Text>
                    <Text> {post?.changed? formatData(post?.edited_in) : formatData(post?.created_at) } </Text>
                </Flex>
                <Flex direction="row">   
                    <FiUser size={25} />
                    <Text
                    fontWeight='bold'
                    fontSize='1.1em'
                    marginLeft={3}
                    > 
                        {post?.user_name}
                    </Text>
                </Flex>
                <Flex direction="row" mt={6}>
                    <FiMessageSquare size={20}/>
                    <Text margin={2} >{post?.text_post}</Text>
                </Flex>
            </Box>
        )
    }

    return(

        <SidebarWithHeader>

            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" w='100vh' h='100vh' alignItems='center' pt={12} pe={12}>
                    {posts.length > 0? posts?.map(post =>{
                    return postElement(post)
                    }):
                        <Heading>Não existem posts cadastrados</Heading>
                    }
                </Flex>
            </Flex>
        </SidebarWithHeader>
    );
}

export default principal;