import  { ChakraProvider, Flex } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
  return (
    <ChakraProvider>
      <Flex fontFamily='roboto' w='100%' direction='column' id='app'>
        <Header />
        <Main />
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}


