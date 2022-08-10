import { FormEventHandler, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  VStack,
  Input,
  FormControl,
  Text,
  HStack,
  Button,
} from '@chakra-ui/react';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import { register, login } from '../services/watchlistAPI';
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from '../validations/authFormValidations';
import { successAlert } from '../services/alertsService';
import { signin, signout } from '../features/auth/authSlice';
import { AuthData } from '../Types';

function AuthForm(props: { signup: boolean }) {
  const location = useLocation();
  const [authError, setAuthError] = useState(' ');
  const dispatch = useDispatch();

  useEffect(() => {
    formik.resetForm();
    setAuthError(' ');
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

    if (props.signup) {
      validateUsername(values, errors);
    }

    validateEmail(values, errors);
    validatePassword(values, errors);
    return errors;
  }

  async function handleFormSubmit(values: FormikValues) {
    let result: { error?: string; message?: string; auth?: AuthData } = {};

    if (props.signup) {
      result = await register(values);
    } else {
      result = await login(values);
    }

    if (result.error) {
      setAuthError(result.error);
    } else if (result.message) {
      successAlert(result.message);
      setAuthError('');
    } else if (result.auth) {
      dispatch(signin(result.auth));
      successAlert(`Welcome ${result.auth.username}!`);
    }
  }

  return (
    <FormControl
      as="form"
      display="flex"
      flexDirection="column"
      rowGap={props.signup ? '1em' : '2em'}
      border="5px solid orange"
      rounded="5px"
      p={['3em', '4em']}
      bg="black"
      m={['12em 0', '5em 0']}
      width={['90%', '40%']}
      maxHeight="450px"
      onSubmit={formik.handleSubmit as FormEventHandler}
    >
      <VStack display={props.signup ? 'inherit' : 'none'}>
        <Input
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
        <Input
          width={['100%', '80%']}
          fontWeight="bold"
          color="white"
          textAlign="start"
          variant="flushed"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Password"
        />
        <Text color="brown">{formik.errors.password || authError || ' '}</Text>
      </VStack>

      <Button
        bg="goldenrod"
        fontWeight="bold"
        width="max-content"
        alignSelf="center"
        size="sm"
        type="submit"
        height="80%"
      >
        {props.signup ? 'Sign up' : 'Login'}
      </Button>

      <HStack alignSelf="center">
        <Text color="white">
          {props.signup ? 'Already have an account?' : "Don't have an account?"}{' '}
        </Text>

        <Link to={props.signup ? '/auth/login' : '/auth/signup'}>
          <Text as="span" color="orange">
            {props.signup ? 'Sign in' : 'Register'}
          </Text>
        </Link>
      </HStack>
    </FormControl>
  );
}

export { AuthForm };
