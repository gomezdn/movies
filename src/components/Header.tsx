import { FormEventHandler } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchIcon, StarIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  Text,
  InputGroup,
  HStack,
  VStack,
  InputRightElement,
  FormControl,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { tmdbAPI } from '../services/tmdbAPI';
import { confirmAlert } from '../services/alertsService';
import { signout, getUserData } from '../features/auth/authSlice';
import { clearWatchlist } from '../features/watchlist/watchlistSlice';
import { useAppDispatch } from '../app/store';
import { searchAll } from '../features/searchResults/searchResultsSlice';

function AuthMenu(props: { username?: string; redirect: Function }) {
  const { username, redirect } = props;
  const dispatch = useAppDispatch();

  function logout() {
    confirmAlert('Log out?', () => {
      dispatch(signout());
      dispatch(clearWatchlist());
      redirect();
    });
  }

  return username ? (
    <Menu>
      <MenuButton
        border="1px solid"
        variant="outline"
        color="white"
        size="sm"
        as={Button}
        _focus={{}}
        _hover={{ border: '1px solid orange' }}
        _active={{ bg: '', border: '1px solid' }}
      >
        {username}
      </MenuButton>
      <MenuList
        _hover={{ border: '1px solid brown' }}
        _focus={{}}
        mt="0.45em"
        minWidth="0"
        color="white"
        bg="black"
      >
        <MenuItem
          _focus={{}}
          _active={{}}
          fontWeight="bold"
          height="15px"
          onClick={logout}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Link to="/auth/login">
      <Button
        size="sm"
        border="1px solid white"
        color="white"
        variant="outline"
        _hover={{ border: '1px solid orange' }}
        _focus={{}}
        _active={{ bg: '', border: '1px solid' }}
      >
        Sign in
      </Button>
    </Link>
  );
}

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { username, token } = useSelector(getUserData);

  const formik = useFormik({
    initialValues: { searchInput: '' },
    onSubmit: async (values) => {
      const query = values.searchInput;
      dispatch(searchAll(query));

      window.scroll({ top: 0, behavior: 'smooth' });
      navigate(`search/${query}`);
      values.searchInput = '';
    },
  });

  function handleHomeClick() {
    document.title = 'the movie DataBase';
  }

  return (
    <Flex
      bg="#121212"
      direction={['column', 'row']}
      position="fixed"
      zIndex="2"
      justify="right"
      p="0.4em 1em"
      gap={['1em', '0.8em 3em']}
      align="center"
      as="header"
      w="100%"
    >
      <Link to="/home">
        <VStack
          as="button"
          userSelect="none"
          rounded="sm"
          fontWeight="800"
          onClick={handleHomeClick}
          paddingX="0.3em"
          align="center"
          justify="center"
          fontSize={['0.9em', '1.1em']}
          spacing="-0.6em"
          bg="#f5c518"
          color="black"
          fontFamily="saira"
        >
          <Text>The</Text>
          <Text>MovieDB</Text>
        </VStack>
      </Link>

      <FormControl
        onSubmit={formik.handleSubmit as FormEventHandler}
        as="form"
        maxW={['80%', '65%']}
      >
        <InputGroup>
          <InputRightElement>
            <IconButton
              textAlign="center"
              fill="none"
              outline="none"
              variant="unstyled"
              type="submit"
              size="md"
              aria-label="Search button"
              _focus={{}}
              icon={<SearchIcon mb="0.5em" />}
            />
          </InputRightElement>
          <Input
            size="sm"
            bg="white"
            value={formik.values.searchInput}
            onChange={formik.handleChange}
            name="searchInput"
            arial-label="Enter your search"
            autoComplete="off"
            placeholder={'Search themovieDB'}
            textAlign="left"
          />
        </InputGroup>
      </FormControl>

      <HStack>
        <Link to="/watchlist">
          <Button
            size="sm"
            leftIcon={<StarIcon color="goldenrod" />}
            color="white"
            variant="outline"
            border="1px solid"
            _hover={{ border: '1px solid orange' }}
            _focus={{}}
            _active={{ bg: '', border: '1px solid' }}
          >
            Watchlist
          </Button>
        </Link>

        <AuthMenu username={username} redirect={() => navigate('/home')} />
      </HStack>
    </Flex>
  );
}
