import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import Header from './Header'
import Trending from './Trending'
import Footer from './Footer'

export default function Layout() {
  
  return (
    <Flex bg='black' w='100%' h='100%' align='center' fontFamily='roboto' direction='column'>
      <Header/>
      <Trending />
      <Footer />
    </Flex>
  )
}