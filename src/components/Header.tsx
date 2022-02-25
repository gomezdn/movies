import { Flex, Input, Text, InputGroup, VStack, HStack,
         InputRightElement, FormControl, IconButton, Button } from '@chakra-ui/react'
import { SearchIcon, HamburgerIcon, StarIcon } from '@chakra-ui/icons'
import { API } from '../api/API'
import { FormEvent } from 'react'

export default function Header() {
  
  async function handleSubmit(event: FormEvent) {
    event!.preventDefault()
  }

  return (
    <Flex bg='#121212' direction={['column', 'row']}
          justify='space-around' p='0.2em 1em' gap='0 2em' align='center' as='header' w='100%'>

      <VStack as='button' userSelect='none' rounded='sm' fontWeight='800'
              paddingX='0.3em' align='center' justify='center' fontSize='1.1em'
              spacing='-0.6em' bg='#f5c518' color='black' fontFamily='saira'>
        <Text>The</Text>
        <Text>MovieDB</Text>
      </VStack>
       
      <Button variant='outline' color='white' size='sm'
              border='none' leftIcon={<HamburgerIcon fontSize='1.2em' mb='0.1em'/>}>
                Menu
      </Button>
    
      <FormControl onSubmit={handleSubmit} as='form' maxW={['90%', '55%']}>

        <InputGroup>
          <InputRightElement>
            <IconButton textAlign='center' fill='none' outline='none' variant='unstyled' type='submit' size='sm'
                        aria-label="Search button" icon={<SearchIcon mb='0.7em'/>}/>
          </InputRightElement>
          <Input size='sm' bg='white' arial-label='Enter your search' autoComplete='off'
                 placeholder='Search themovieDB' textAlign='left'/>
        </InputGroup>
      </FormControl>

      <Button size='sm' leftIcon={<StarIcon />} color='white' variant='outline' border='none'>
                Watchlist
      </Button>

      <Button size='sm' border='none' color='white' variant='outline'>
                Sign in
      </Button>
    </Flex>
  )
}