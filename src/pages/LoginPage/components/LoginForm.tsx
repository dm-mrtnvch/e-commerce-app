import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';
import { useLoginMutation } from '../../../redux/services/auth';

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login({
        username: values.email.toLowerCase(),
        password: values.password,
      });
    },
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    </form>
  );
};

export default LoginForm;
