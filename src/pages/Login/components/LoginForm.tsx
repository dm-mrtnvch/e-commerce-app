import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, IconButton, InputAdornment, Link, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFormik } from 'formik';
import { SyntheticEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginFormValidationSchema } from '../../../helpers/validationHelper';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setCredentials } from '../../../redux/features/authSlice';
import { useLoginMutation } from '../../../redux/services/auth';
import { HOME, REGISTRATION } from '../../../routes/routes';
import { ErrorResponse } from '../../../types/common';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login, { isLoading, error, isError }] = useLoginMutation();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginFormValidationSchema,
    onSubmit: (values) => {
      login({
        username: values.email.toLowerCase(),
        password: values.password,
      })
        .unwrap()
        .then((response) => {
          dispatch(setCredentials(response));
          navigate(HOME.path);
        })
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
            New user?{' '}
            <Link component={RouterLink} to={REGISTRATION.path}>
              Create account
            </Link>
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField
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
