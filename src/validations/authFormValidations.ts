import { FormikErrors, FormikValues } from 'formik';

function validateUsername(
  values: FormikValues,
  errors: FormikErrors<FormikValues>
) {
  const username = values.username.trim();

  if (!username) {
    errors.username = 'Enter username';
  } else if (username.length < 4 || username.length > 12) {
    errors.username = 'Username must have between 4 and 12 characters';
  }
}

function validateEmail(
  values: FormikValues,
  errors: FormikErrors<FormikValues>
) {
  const email = values.email.trim();

  if (!email) {
    errors.email = 'Enter email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email format';
  }
}

function validatePassword(
  signup: boolean,
  values: FormikValues,
  errors: FormikErrors<FormikValues>
) {
  const password = values.password.trim();

  if (!password) {
    errors.password = 'Enter password';
  } else if (signup && (password.length < 8 || password.length > 20)) {
    errors.password = 'Password must have between 8 and 15 characters';
  }
}

export { validateUsername, validateEmail, validatePassword };
