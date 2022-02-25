import  { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Layout/>
      </ChakraProvider>
    </BrowserRouter>
  )
}