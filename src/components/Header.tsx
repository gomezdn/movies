import { Flex, Input, Text, InputGroup, HStack, VStack, InputRightElement,
         FormControl, IconButton, Button } from '@chakra-ui/react'
import { SearchIcon, StarIcon } from '@chakra-ui/icons'
import { API } from '../api/API'
import { useFormik } from 'formik'
import { FormEventHandler  } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MediaObject } from '../Types'

export function Header(props: {setSearchResults: Function, setFillerMsg: Function}) {
  
  const navigate = useNavigate()

  function sortByPop(mediaList: MediaObject[]) {
    const listToSort = mediaList
    return listToSort.sort((a: MediaObject, b: MediaObject) => Number(b.popularity) - Number(a.popularity))
  }

  const formik = useFormik({
    initialValues: {searchInput: ''},
    onSubmit: async values => {
      const query = values.searchInput
      API.search.all(query).then(response => {
        props.setSearchResults(sortByPop(response))
        if (!response[0]) {props.setFillerMsg('NOTHING FOUND')}
      })
      navigate('/search')
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
       
      {/** <Button variant='outline' color='white' size='sm' border='none'
              leftIcon={<HamburgerIcon fontSize='1.2em' mb='0.1em'/>}>
              Menu
      </Button> **/}
    
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
          <Button size='sm' leftIcon={<StarIcon />} color='white' variant='outline' border='none'>
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