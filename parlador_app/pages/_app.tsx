import type { AppProps } from 'next/app'

import { ChakraProvider, ThemeProvider } from '@chakra-ui/react'

import {AuthProvider} from '../contexts/auth/auth'

import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider theme={theme}>
        <AuthProvider>  
          <Component {...pageProps} />
        </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp
