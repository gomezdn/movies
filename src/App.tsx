import  { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import WebsiteLayout from './components/WebsiteLayout'

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <WebsiteLayout/>
      </ChakraProvider>
    </BrowserRouter>
  )
}