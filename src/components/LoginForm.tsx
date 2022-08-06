import {
  VStack,
  Input,
  FormControl,
  Text,
  HStack,
  Button,
} from '@chakra-ui/react';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import { FormEventHandler, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LoginForm(props: { signup: boolean }) {
  const location = useLocation();

  useEffect(() => {
    formik.resetForm();
  }, [location]);

  const formik = useFormik({
    initialValues: {
      username: '',
      userEmail: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleFormSubmit,
  });

  function validate(values: FormikValues) {
    const errors: FormikErrors<FormikValues> = {};
    const userEmail = values.userEmail.trim();
    const password = values.password.trim();
    const username = values.username.trim();

    if (!userEmail) {
      errors.userEmail = 'Enter email';
    }

    if (!password) {
      errors.password = 'Enter password';
    }

    if (props.signup && !username) {
      errors.username = 'Enter username';
    }

    return errors;
  }

  function handleFormSubmit() {}

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
          name="userEmail"
          value={formik.values.userEmail}
          onChange={formik.handleChange}
          placeholder="Email"
        />
        <Text color="brown">{formik.errors.userEmail || ' '}</Text>
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
        <Text color="brown">{formik.errors.password || ' '}</Text>
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
        <Text color="white">Don't have an account? </Text>

        <Link to="/auth/signup">
          <Text as="span" color="orange">
            Sign up
          </Text>
        </Link>
      </HStack>
    </FormControl>
  );
}

export { LoginForm };
