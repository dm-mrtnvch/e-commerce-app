import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registrationFormValidationSchema } from '../../../helpers/validationHelper.ts';
import {
  useClientCredentialsFlowAuthMutation,
  useLoginMutation,
  useRegisterMutation,
} from '../../../redux/services/auth.ts';
import { HOME, LOGIN } from '../../../routes/routes.tsx';
import { COUNTRIES_ENUM, CUSTOMER_INITIAL_VALUES } from '../constants.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorResponse } from '../../../types/common.ts';
import { Address } from '../../../types/auth.ts';
import { setClientCredentials } from '../../../redux/features/authSlice.ts';
import { useAppDispatch } from '../../../hooks/reduxHooks.tsx';

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: Address;
  billingAddress: Address;
  useShippingAsBilling: boolean;
  defaultShippingAddress: number | null;
  defaultBillingAddress: number | null;
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState<boolean>(false);

  const [login] = useLoginMutation();
  const [register, { isSuccess: isSuccessRegister, error: registerError, isError: isRegisterError }] =
    useRegisterMutation();
  const [clientCredentialsFlowAuth] = useClientCredentialsFlowAuthMutation();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setErrors } = useFormik({
    initialValues: CUSTOMER_INITIAL_VALUES,
    validationSchema: registrationFormValidationSchema,
    onSubmit: async (values: FormValues) => {
      const updatedValues = {
        ...values,
        addresses: [values.billingAddress, values.shippingAddress],
        billingAddresses: [0],
        shippingAddresses: [1],
        defaultBillingAddress: values.defaultBillingAddress !== null ? 0 : null,
        defaultShippingAddress: values.defaultShippingAddress !== null ? 1 : null,
      };

      await clientCredentialsFlowAuth()
        .unwrap()
        .then(async (response) => {
          register({ token: response.access_token as string, customer: updatedValues })
            .unwrap()
            .then(() => {
              setOpen(true);
              login({ username: values.email, password: values.password })
                .unwrap()
                .then((response) => {
                  dispatch(setClientCredentials(response));
                  navigate(HOME.path);
                });
            })
            .catch((error) => {
              setOpen(true);
              if (error?.status === 400) {
                setErrors({
                  email: 'Email already exists. Provide a new one.',
                });
              }
            });
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

  const handleUseShippingAsBillingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setUseShippingAsBilling(isChecked);
    setFieldValue('useShippingAsBilling', isChecked);

    if (isChecked) {
      setFieldValue('billingAddress', {
        ...values.shippingAddress,
      });

      if (values.defaultShippingAddress !== null) {
        setFieldValue('defaultBillingAddress', 0);
      } else {
        setFieldValue('defaultBillingAddress', null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ width: 1 }}>
        <Stack spacing={3} mb={3}>
          <Typography fontWeight='bold' variant='h5'>
            Registration. Create a New Account
          </Typography>
          <Typography variant='subtitle2'>
            Already have an account?{' '}
            <Link component={RouterLink} to={LOGIN.path}>
              Sign in
            </Link>
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
            <Stack spacing={2}>
              <Typography variant='h6'>Shipping Address</Typography>
              <TextField
                fullWidth
                name='shippingAddress.streetName'
                label='Street Address'
                value={values.shippingAddress.streetName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shippingAddress?.streetName && Boolean(errors.shippingAddress?.streetName)}
                helperText={touched.shippingAddress?.streetName && errors.shippingAddress?.streetName}
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
                  onChange={(event) => setFieldValue('shippingAddress.country', event.target.value)}
                  onBlur={handleBlur}
                  label='Country'
                >
                  {Object.entries(COUNTRIES_ENUM).map(([countryName, countryCode]) => (
                    <MenuItem key={countryCode} value={countryCode}>
                      {countryName}
                    </MenuItem>
                  ))}
                </Select>
                {touched.shippingAddress?.country && errors.shippingAddress?.country && (
                  <Typography variant='subtitle2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                    {errors.shippingAddress?.country}
                  </Typography>
                )}
              </FormControl>
              <FormControlLabel
                control={<Switch color='primary' />}
                label='Set as default shipping address'
                name='defaultShippingAddress'
                checked={values.defaultShippingAddress !== null}
                onChange={(_event, checked) => {
                  setFieldValue('defaultShippingAddress', checked ? 1 : null);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={useShippingAsBilling}
                    onChange={handleUseShippingAsBillingChange}
                  />
                }
                label='Also use as billing address'
              />
            </Stack>
          </Grid>
          {!useShippingAsBilling && (
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant='h6'>Billing Address</Typography>
                <TextField
                  fullWidth
                  name='billingAddress.streetName'
                  label='Street Address'
                  value={values.billingAddress.streetName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.billingAddress?.streetName && Boolean(errors.billingAddress?.streetName)}
                  helperText={touched.billingAddress?.streetName && errors.billingAddress?.streetName}
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
                <FormControl
                  fullWidth
                  error={touched.billingAddress?.country && Boolean(errors.billingAddress?.country)}
                >
                  <InputLabel id='billingAddress.country-label'>Country</InputLabel>
                  <Select
                    labelId='billingAddress.country-label'
                    id='billingAddress.country'
                    name='billingAddress.country'
                    value={values.billingAddress.country}
                    onChange={(event) => setFieldValue('billingAddress.country', event.target.value)}
                    onBlur={handleBlur}
                    label='Country'
                  >
                    {Object.entries(COUNTRIES_ENUM).map(([countryName, countryCode]) => (
                      <MenuItem key={countryCode} value={countryCode}>
                        {countryName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.billingAddress?.country && errors.billingAddress?.country && (
                    <Typography variant='body2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                      {errors.billingAddress?.country}
                    </Typography>
                  )}
                </FormControl>
                <FormControlLabel
                  control={<Switch color='primary' />}
                  label='Set as default billing address'
                  name='defaultBillingAddress'
                  checked={values.defaultBillingAddress !== null}
                  onChange={(_event, checked) => {
                    setFieldValue('defaultBillingAddress', checked ? 0 : null);
                  }}
                />
              </Stack>
            </Grid>
          )}
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
        {isSuccessRegister ? (
          <Alert onClose={handleClose} severity='success' variant='filled'>
            Registration successful. You will be redirected to the home page.
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity='error' variant='filled'>
            {(isRegisterError && ((registerError as FetchBaseQueryError)?.data as ErrorResponse)?.message) ||
              'Registration failed. Please try again.'}
          </Alert>
        )}
      </Snackbar>
    </form>
  );
};

export default RegistrationForm;
