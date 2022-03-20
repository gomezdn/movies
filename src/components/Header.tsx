import { Flex, Input, Text, InputGroup, HStack, VStack, InputRightElement,
         FormControl, IconButton, Button } from '@chakra-ui/react'
import { SearchIcon, StarIcon } from '@chakra-ui/icons'
import { tmdbAPI } from '../services/tmdbAPI'
import { useFormik } from 'formik'
import { FormEventHandler  } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Header(props: {setSearchResults: Function, setFillerMsg: Function}) {
  
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {searchInput: ''},
    onSubmit: async values => {
      const query = values.searchInput
      tmdbAPI.search.all(query).then(response => {
        props.setSearchResults(response)
        if (!response[0]) {props.setFillerMsg('NOTHING FOUND')}
      })
      window.scroll({top:0, behavior:'smooth'})
      navigate(`search/${query}`)
      values.searchInput = ''
    }
  })

  return (
    <Flex bg='#121212' direction={['column', 'row']} position='fixed' zIndex='2'
          justify='right' p='0.4em 1em' gap={['1em','0.8em 3em']} align='center' as='header' w='100%'>
      
      <Link to='/home'>
        <VStack as='button' userSelect='none' rounded='sm' fontWeight='800'
                paddingX='0.3em' align='center' justify='center' fontSize={['0.9em','1.1em']}
                spacing='-0.6em' bg='#f5c518' color='black' fontFamily='saira'>
          <Text>The</Text>
          <Text>MovieDB</Text>
        </VStack>
      </Link>
       
      <FormControl onSubmit={formik.handleSubmit as FormEventHandler} as='form' maxW={['80%', '65%']}>
        <InputGroup>
          <InputRightElement>
            <IconButton textAlign='center' fill='none' outline='none' variant='unstyled' type='submit' size='sm'
                        aria-label="Search button" icon={<SearchIcon mb='0.7em'/>}/>
          </InputRightElement>
          <Input size='sm' bg='white' value={formik.values.searchInput} onChange={formik.handleChange}
                 name='searchInput' arial-label='Enter your search' autoComplete='off'
                 placeholder={'Search themovieDB'} textAlign='left'/>
        </InputGroup>
      </FormControl>

      <HStack>
        <Link to='/watchlist'>
          <Button size='sm' leftIcon={<StarIcon color='goldenrod'/>} color='white' variant='outline' border='none'>
                    Watchlist
          </Button>
        </Link>

        <Button size='sm' border='none' color='white' variant='outline'>
                  Sign in
        </Button>
      </HStack>
    </Flex>
  )
}