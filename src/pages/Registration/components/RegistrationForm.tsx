import { SyntheticEvent, useState } from 'react';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { registrationFormValidationSchema } from '../../../helpers/validationHelper.ts';

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: Address;
  billingAddress: Address;
}

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const countries = ['Kazakhstan', 'Belarus', 'Poland'];

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      shippingAddress: {
        street: '',
        city: '',
        postalCode: '',
        country: '',
      },
      billingAddress: {
        street: '',
        city: '',
        postalCode: '',
        country: '',
      },
    },
    validationSchema: registrationFormValidationSchema,
    onSubmit: (values: FormValues) => {
      console.log('values', values);
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
      <Box sx={{ width: 1 }}>
        <Stack spacing={3} mb={3}>
          <Typography fontWeight='bold' variant='h5'>
            Registration. Create a New Account
          </Typography>
        </Stack>
        <Typography variant='h6' mb={1}>
          General Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name='firstName'
              label='First Name'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name='lastName'
              label='Last Name'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='dateOfBirth'
              label='Date of Birth'
              type='date'
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant='h6'>Shipping Address</Typography>
              <TextField
                fullWidth
                name='shippingAddress.street'
                label='Street Address'
                value={values.shippingAddress.street}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shippingAddress?.street && Boolean(errors.shippingAddress?.street)}
                helperText={touched.shippingAddress?.street && errors.shippingAddress?.street}
              />
              <TextField
                fullWidth
                name='shippingAddress.city'
                label='City'
                value={values.shippingAddress.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shippingAddress?.city && Boolean(errors.shippingAddress?.city)}
                helperText={touched.shippingAddress?.city && errors.shippingAddress?.city}
              />
              <TextField
                fullWidth
                name='shippingAddress.postalCode'
                label='Postal Code'
                value={values.shippingAddress.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shippingAddress?.postalCode && Boolean(errors.shippingAddress?.postalCode)}
                helperText={touched.shippingAddress?.postalCode && errors.shippingAddress?.postalCode}
              />
              <FormControl
                fullWidth
                error={touched.shippingAddress?.country && Boolean(errors.shippingAddress?.country)}
              >
                <InputLabel id='shippingAddress.country-label'>Country</InputLabel>
                <Select
                  labelId='shippingAddress.country-label'
                  id='shippingAddress.country'
                  name='shippingAddress.country'
                  value={values.shippingAddress.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label='Country'
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                {touched.shippingAddress?.country && errors.shippingAddress?.country && (
                  <Typography variant='subtitle2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                    {errors.shippingAddress?.country}
                  </Typography>
                )}
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant='h6'>Billing Address</Typography>
              <TextField
                fullWidth
                name='billingAddress.street'
                label='Street Address'
                value={values.billingAddress.street}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.billingAddress?.street && Boolean(errors.billingAddress?.street)}
                helperText={touched.billingAddress?.street && errors.billingAddress?.street}
              />
              <TextField
                fullWidth
                name='billingAddress.city'
                label='City'
                value={values.billingAddress.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.billingAddress?.city && Boolean(errors.billingAddress?.city)}
                helperText={touched.billingAddress?.city && errors.billingAddress?.city}
              />
              <TextField
                fullWidth
                name='billingAddress.postalCode'
                label='Postal Code'
                value={values.billingAddress.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.billingAddress?.postalCode && Boolean(errors.billingAddress?.postalCode)}
                helperText={touched.billingAddress?.postalCode && errors.billingAddress?.postalCode}
              />
              <FormControl fullWidth error={touched.billingAddress?.country && Boolean(errors.billingAddress?.country)}>
                <InputLabel id='billingAddress.country-label'>Country</InputLabel>
                <Select
                  labelId='billingAddress.country-label'
                  id='billingAddress.country'
                  name='billingAddress.country'
                  value={values.billingAddress.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label='Country'
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                {touched.billingAddress?.country && errors.billingAddress?.country && (
                  <Typography variant='body2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                    {errors.billingAddress?.country}
                  </Typography>
                )}
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
        <Button fullWidth type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          Sign up
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='error' variant='filled'>
          Registration failed. Please try again.
        </Alert>
      </Snackbar>
    </form>
  );
};

export default RegistrationForm;
