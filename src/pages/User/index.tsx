import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks.tsx';
import { HOME } from '../../routes/routes.tsx';
import { Form, Formik } from 'formik';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../../redux/services/me.ts';
import { editProfileSchema } from '../../helpers/validationHelper.ts';
import { Address } from '../../types/auth.ts';
import { ErrorResponse } from '../../types/common.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const UserPage = () => {
  const navigate = useNavigate();

  const { clientCredentials } = useAppSelector((state) => state.auth);

  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const { data: userProfile, isLoading, refetch, isSuccess, isError, error } = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (!clientCredentials?.access_token) {
      navigate(HOME.path, { replace: true });
    }
  }, [clientCredentials, navigate]);

  const shippingAddresses = userProfile?.addresses.filter((address) =>
    userProfile?.shippingAddressIds?.includes(address.id as string),
  );
  const billingAddresses = userProfile?.addresses.filter((address) =>
    userProfile?.billingAddressIds?.includes(address.id as string),
  );

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async (values: FormValues) => {
    try {
      const updateActions = [];

      if (values.firstName !== userProfile?.firstName) {
        updateActions.push({
          action: 'setFirstName',
          firstName: values.firstName,
        } as const);
      }
      if (values.lastName !== userProfile?.lastName) {
        updateActions.push({
          action: 'setLastName',
          lastName: values.lastName,
        } as const);
      }
      if (values.dateOfBirth !== userProfile?.dateOfBirth) {
        updateActions.push({
          action: 'setDateOfBirth',
          dateOfBirth: values.dateOfBirth,
        } as const);
      }
      if (values.email !== userProfile?.email) {
        updateActions.push({
          action: 'changeEmail',
          email: values.email,
        } as const);
      }

      if (userProfile?.id && userProfile?.version) {
        await updateUserProfile({
          id: userProfile.id,
          version: userProfile.version,
          actions: updateActions,
        }).unwrap();

        refetch();
        setIsEditMode(false);
        setOpen(true);
      } else {
        throw new Error('User profile ID or version is undefined');
      }
    } catch (error) {
      setOpen(true);
    }
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth='md' sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} mb={3}>
                <Typography variant='h5' component='div' gutterBottom>
                  Personal Information
                </Typography>
                <Button variant='outlined' onClick={handleEditToggle}>
                  {isEditMode ? 'Cancel' : 'Edit'}
                </Button>
              </Box>
              <Formik
                enableReinitialize
                initialValues={{
                  firstName: userProfile?.firstName || '',
                  lastName: userProfile?.lastName || '',
                  dateOfBirth: userProfile?.dateOfBirth || '',
                  email: userProfile?.email || '',
                }}
                validationSchema={editProfileSchema}
                onSubmit={handleSaveChanges}
              >
                {({ values, handleChange, handleBlur, errors, touched, isSubmitting, dirty }) => (
                  <Form>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: {
                          sm: '100%',
                          md: '60%',
                        },
                      }}
                    >
                      <TextField
                        fullWidth
                        name='firstName'
                        label='First Name'
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        disabled={!isEditMode}
                      />
                      <TextField
                        fullWidth
                        name='lastName'
                        label='Last Name'
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        disabled={!isEditMode}
                      />
                      <TextField
                        fullWidth
                        name='dateOfBirth'
                        label='Date of Birth'
                        type='date'
                        value={values.dateOfBirth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                        helperText={touched.dateOfBirth && errors.dateOfBirth}
                        InputLabelProps={{ shrink: true }}
                        disabled={!isEditMode}
                      />
                      <TextField
                        fullWidth
                        name='email'
                        label='Email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        disabled={!isEditMode}
                      />
                      {isEditMode && (
                        <Button
                          variant='contained'
                          color='primary'
                          type='submit'
                          sx={{ mt: 2 }}
                          disabled={!dirty || isSubmitting}
                        >
                          Save Changes
                        </Button>
                      )}
                    </Box>

                    <Snackbar
                      open={open}
                      autoHideDuration={4000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      {isSuccess ? (
                        <Alert onClose={handleClose} severity='success' variant='filled'>
                          User profile info successful. All data has been saved!
                        </Alert>
                      ) : (
                        <Alert onClose={handleClose} severity='error' variant='filled'>
                          {(isError && ((error as FetchBaseQueryError)?.data as ErrorResponse)?.message) ||
                            'User profile change failed. Please try again later.'}
                        </Alert>
                      )}
                    </Snackbar>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          {shippingAddresses?.map((address: Address, index) => (
            <Card
              key={address.id}
              sx={{
                backgroundColor: address.id === userProfile?.defaultShippingAddressId ? '#D0ECFE' : 'white',
              }}
            >
              <CardContent>
                <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
                  <Typography variant='h6' component='div' gutterBottom>
                    Shipping Address {index + 1}
                  </Typography>
                  {address.id === userProfile?.defaultShippingAddressId && (
                    <Chip label='Default Shipping' color='primary' variant='outlined' sx={{ padding: 1 }} />
                  )}
                </Box>
                <Box sx={{ paddingLeft: 2 }}>
                  <Typography variant='body1'>
                    <strong>Street Name:</strong> {address.streetName || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>City:</strong> {address.city || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>State:</strong> {address.state || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Postal Code:</strong> {address.postalCode || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Country:</strong> {address.country || 'not indicated'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12}>
          {billingAddresses?.map((address: Address, index) => (
            <Card
              key={address.id}
              sx={{
                marginBottom: 2,
                backgroundColor: address.id === userProfile?.defaultBillingAddressId ? '#D0ECFE' : 'white',
              }}
            >
              <CardContent>
                <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
                  <Typography variant='h6' component='div' gutterBottom>
                    Billing Address {index + 1}
                  </Typography>
                  {address.id === userProfile?.defaultBillingAddressId && (
                    <Chip label='Default Billing' color='primary' variant='outlined' sx={{ padding: 1 }} />
                  )}
                </Box>
                <Box sx={{ paddingLeft: 2 }}>
                  <Typography variant='body1'>
                    <strong>Street Name:</strong> {address.streetName || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>City:</strong> {address.city || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>State:</strong> {address.state || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Postal Code:</strong> {address.postalCode || 'not indicated'}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Country:</strong> {address.country || 'not indicated'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
