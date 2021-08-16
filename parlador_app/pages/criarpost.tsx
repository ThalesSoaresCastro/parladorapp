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


import AuthContext from '../contexts/auth/auth';

const criarpost: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [posts, setPosts] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(AuthContext)


    return(

        <SidebarWithHeader>

            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" w='100vh' h='100vh' alignItems='center' pt={12} pe={12}>

                    <Heading>Nova Postagem</Heading>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    );
}

export default criarpost;