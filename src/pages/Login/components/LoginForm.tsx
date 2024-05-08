import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, IconButton, InputAdornment, Link, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFormik } from 'formik';
import { SyntheticEvent, useState } from 'react';
import { object, string } from 'yup';
import { useLoginMutation } from '../../../redux/services/auth';
import { ErrorResponse } from '../../../types/common';

const validationSchema = object({
  email: string()
    .email('Enter a valid email')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i, 'Enter a valid email')
    .required('Email is required'),
  password: string()
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter (a-z)')
    .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter (A-Z)')
    .matches(/^(?=.*\d)/, 'Password must contain at least one digit (0-9)')
    .matches(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character (!@#$%^&*)')
    .matches(/^(?=\S+$)/, 'Password must not contain leading or trailing whitespace')
    .required('Password is required'),
});

const LoginForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login, { isLoading, error, isError }] = useLoginMutation();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login({
        username: values.email.toLowerCase(),
        password: values.password,
      })
        .unwrap()
        .catch((error) => {
          setOpen(true);
          if (error?.status === 400) {
            setErrors({ email: 'Invalid email or password', password: 'Invalid email or password' });
          }
        });
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography fontWeight='bold' variant='h5'>
            Sign in to E-commerce App
          </Typography>
          <Typography variant='subtitle2'>
            {/* TODO: add link to register page */}
            New user? <Link>Create account</Link>
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField
            autoFocus
            fullWidth
            name='email'
            label='Email address'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={showPassword ? 'text' : 'password'}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton size='small' edge='end' onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth color='primary' variant='contained' type='submit' size='large' disabled={isLoading}>
            Login
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='error' variant='filled'>
          {isError && ((error as FetchBaseQueryError)?.data as ErrorResponse)?.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default LoginForm;
