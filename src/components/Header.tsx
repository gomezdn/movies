import { Flex, Input, Text, InputGroup, VStack, HStack,
         InputRightElement, FormControl, IconButton, Button } from '@chakra-ui/react'
import { SearchIcon, HamburgerIcon, StarIcon } from '@chakra-ui/icons'
import { FormEvent } from 'react'

export default function Header() {
  
  function handleSubmit(event: FormEvent) {
    event!.preventDefault()
  }

  return (
    <Flex bg='#121212' p='0.3em' direction={['column', 'row']} justify='space-around' align='center' as='header' w='100%'>
      <VStack as='button' userSelect='none' rounded='sm' p='0 0.3em 0 0.3em'
              align='center'    justify='center' spacing='-0.6em' bg='#f5c518' color='black'>
        <Text fontWeight='800'>THE</Text>
        <Text fontWeight='800'>MOVIEDB</Text>
      </VStack>
      
      <Button mt='0.3em' variant='outline' color='white' border='none' leftIcon={<HamburgerIcon/>}> MENU </Button>
    
      <FormControl onSubmit={handleSubmit} as='form' maxW={['90%', '55%']}>
        <InputGroup>
          <InputRightElement>
            <IconButton textAlign='center' outline='none' variant='unstyled' type='submit' aria-label="Search here" icon={<SearchIcon/>}/>
          </InputRightElement>
          <Input bg='white' autoComplete='off' placeholder='Search themovieDB' textAlign='left' />
        </InputGroup>
      </FormControl>

      <Button leftIcon={<StarIcon/>} color='white' variant='outline' border='none'> Watchlist </Button>
      <Button border='none' color='white' variant='outline'> Sign in </Button>
    </Flex>
  )
}