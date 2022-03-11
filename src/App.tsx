import  { ChakraProvider } from '@chakra-ui/react'
import { HashRouter } from 'react-router-dom'
import WebsiteLayout from './components/WebsiteLayout'

export default function App() {
  return (
    <HashRouter>
      <ChakraProvider>
        <WebsiteLayout/>
      </ChakraProvider>
    </HashRouter>
  )
}