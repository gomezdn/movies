import { FormEventHandler, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  Text,
  HStack,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from '../validations/authFormValidations';
import {
  register,
  login,
  getAuthLoading,
  getAuthMessage,
  resetAuthMessage,
} from '../features/auth/authSlice';
import { useAppDispatch } from '../app/store';

function AuthForm({ signup }: { signup: boolean }) {
  const location = useLocation();
  const authMessage = useSelector(getAuthMessage);
  const spinnerVisible = useSelector(getAuthLoading);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    formik.resetForm();
    dispatch(resetAuthMessage());
  }, [location]);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleFormSubmit,
  });

  function validate(values: FormikValues) {
    const errors: FormikErrors<FormikValues> = {};

    if (signup) {
      validateUsername(values, errors);
    }
    validateEmail(values, errors);
    validatePassword(values, errors);
    return errors;
  }

  async function handleFormSubmit(values: FormikValues) {
    if (signup) {
      dispatch(register(values));
    } else {
      dispatch(login(values));
    }
  }

  return (
    <FormControl
      as="form"
      display="flex"
      flexDirection="column"
      rowGap={signup ? '1em' : '2em'}
      border="5px solid orange"
      rounded="5px"
      p={['3em', '4em']}
      bg="black"
      m={['12em 0', '5em 0']}
      width={['90%', '40%']}
      alignSelf="center"
      justifySelf="center"
      maxHeight="450px"
      onSubmit={formik.handleSubmit as FormEventHandler}
    >
      <VStack display={signup ? 'inherit' : 'none'}>
        <Input
          autoComplete="off"
          width={['100%', '80%']}
          fontWeight="bold"
          color="white"
          textAlign="start"
          variant="flushed"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder="Username"
        />
        <Text color="brown">{formik.errors.username || ' '}</Text>
      </VStack>

      <VStack>
        <Input
          autoComplete="off"
          width={['100%', '80%']}
          fontWeight="bold"
          color="white"
          textAlign="start"
          variant="flushed"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
        />
        <Text color="brown">{formik.errors.email || ' '}</Text>
      </VStack>

      <VStack>
        <InputGroup justifyContent="center">
          <Input
            width={['100%', '80%']}
            fontWeight="bold"
            color="white"
            textAlign="start"
            variant="flushed"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
          />
          <InputRightElement
            cursor="pointer"
            color="white"
            mr={['0', '2em']}
            onClick={() => setPasswordVisible((lastState) => !lastState)}
            children={passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
          />
        </InputGroup>
        <Text textAlign="center" color={authMessage?.color || 'brown'}>
          {formik.errors.password || authMessage?.message || ' '}
        </Text>
      </VStack>

      {spinnerVisible ? (
        <Spinner alignSelf="center" size="lg" color="orange" speed="0.8s" />
      ) : (
        <Button
          bg="goldenrod"
          fontWeight="bold"
          width="max-content"
          alignSelf="center"
          size="sm"
          type="submit"
          height="max-content"
        >
          {signup ? 'Sign up' : 'Login'}
        </Button>
      )}

      <HStack alignSelf="center">
        <Text color="white">
          {signup ? 'Already have an account?' : "Don't have an account?"}{' '}
        </Text>

        <Link to={signup ? '/auth/login' : '/auth/signup'}>
          <Text as="span" color="orange">
            {signup ? 'Sign in' : 'Register'}
          </Text>
        </Link>
      </HStack>
    </FormControl>
  );
}

export { AuthForm };
