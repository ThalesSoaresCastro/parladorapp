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
  Button,
  Textarea,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from '@chakra-ui/react'

import SidebarWithHeader from '../components/sidebar'

import {ChatIcon } from '@chakra-ui/icons'

import {
  FiMessageSquare,
  FiUser,
  FiTrash2,
  FiRefreshCcw,
} from 'react-icons/fi';


import AuthContext from '../contexts/auth/auth';
import{
  GetPostToUser,
  ListAllPosts,
  UpdatePost,
  DeletePost
} from '../services/postservice'
import { useCallback } from 'react';
import Router from 'next/router';



interface IPost{
  id?:string;
  text_post?: string;
  created_at?: Date;
  edited_in?: Date | null
  changed?: boolean;
  user?:IUser;
}

interface IUser{
  id?:string;
  name?: string;
  email?: string;
  password?:string;
  created_at?: Date;
  edited_in?: Date | null;
  posts?: IPost[] | undefined;
}


const myposts: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useContext(AuthContext)

  const [postaux, setPostAux] = useState({} as IPost)
  const [newtxtpost, setNewTxtPost] = useState('')
  const [posts, setPosts] = useState([] as IPost[])

  const { onClose } = useDisclosure()
  const [onOpen, SetOnOpen] = useState(false)

  const formatData = (data:string) =>{    
      const data_convert : Date = new Date(data)   
      return(
          `${data_convert.getDate()}/${data_convert.getMonth()}/${data_convert.getFullYear()}  às ${data_convert.getHours()}:${data_convert.getMinutes()}`
      );
  }

  const alteraPost = async(txt:string , email:string, idp:string) =>{
    const objP = {
      post:txt,
      userEmail:email
    }

    //console.log('objP: ', objP,'\n\n idpost: ', idp)

    const resp = await UpdatePost(objP, idp)
    if(resp.status === 200 || resp.status === 201 ){
      alert('Post atualizado com sucesso');
    }
    else{
      alert('Ocorreu um erro ao atualizar o post.');
    }
  }

  useEffect( ()=>{
    async function postUpdate(){
      let resp = await GetPostToUser({ userEmail: user?.email as string })
      if(resp.status === 200 ||  resp.status === 201){
        setPosts(resp.data.data.posts)
      }
    }
    postUpdate()
  }, [user] )

  const postElement = (post:any) =>{
      //console.log(post)
      return(
          <Box direction="column" background="gray.700"  boxShadow="2xl" p={8} rounded={6} w='90%' margin={2}>    
              <Flex direction='row-reverse'>
                  <Button
                    backgroundColor="red"
                    size="sm"
                    onClick={async() => {
                      console.log(post?.id)
                      const resp = await DeletePost({idpost : post?.id})
                      if(resp.status === 200){
                        alert("Post excluído com sucesso! ")
                        Router.reload()
                      }
                      else{
                        return alert("Ocorreu um erro ao tentar apagar o post.")
                      }
                    }}
                  >
                    <FiTrash2 />
                  </Button>
                  <Button
                    mr={2}
                    backgroundColor="orange"
                    size="sm"
                    onClick={
                      (()=>{
                          //console.log(post)
                          setPostAux(post)
                          setNewTxtPost(post?.text_post)
                          SetOnOpen(true)
                        })
                    }
                  >
                    <FiRefreshCcw />
                  </Button>
                  <Text marginLeft={4} marginRight={4} color="orange" > {post?.changed? 'Editado' : '' } </Text>
                  <Text> {post?.changed? formatData(post?.edited_in) : formatData(post?.created_at) } </Text>
              </Flex>
              <Flex direction="row">   
                    <Box
                        background="white"
                        borderRadius={20}
                        md="md"
                        padding={1}
                    >
                        <FiUser 
                        size={22}
                        color="black"
                        />
                    </Box>

                  <Text
                  fontWeight='bold'
                  fontSize='1.1em'
                  marginLeft={3}
                  color="orange"
                  > 
                      {user?.name}
                  </Text>
              </Flex>
              <Flex direction="row" mt={6}>
                  <FiMessageSquare size={20}/>
                  <Text margin={2} >{post?.text_post}</Text>
              </Flex>
          </Box>
      )
  }
  //console.log(posts)
  return(
    <>
    
    <Modal isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Alteração do post </ModalHeader>
          <ModalBody>
          <Textarea 
                mt={4} mb={4}
                placeholder="Digite o que você está pesando."
                //variant="filled" 
                //errorBorderColor="red.300"
                focusBorderColor="orange.300"
                h={200}
                value={newtxtpost}
                onChange={e => {setNewTxtPost(e.target.value) }}
          />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={async() =>{ 
                await alteraPost(newtxtpost,user?.email as string,postaux?.id as string)
                SetOnOpen(!onOpen)
                Router.reload()
              
              }}
            >
              Alterar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    
      <SidebarWithHeader>
          <Flex height="100vh" alignItems="center" justifyContent="center">
              <Flex direction="column" w='100vh' h='100vh' alignItems='center' pt={12} pe={12}>
                  <Heading pd={2}>
                    Meus Posts
                  </Heading>
                  { posts?.length && posts?.length > 0 ?
                    posts?.map(post =>{
                      return postElement(post)
                    })
                    :
                    <Heading>Não existem posts cadastrados</Heading>
                  }
              </Flex>
          </Flex>
    </SidebarWithHeader>
    
    
    </>
  );
}

export default myposts;