import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks.tsx';
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
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../redux/services/me.ts';
import { useLoginMutation } from '../../redux/services/auth.ts';
import { updateClientCredentials } from '../../redux/features/authSlice.ts';
import { changePasswordSchema, editProfileSchema } from '../../helpers/validationHelper.ts';
import { Address } from '../../types/auth.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ErrorResponse {
  message?: string;
}

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { clientCredentials } = useAppSelector((state) => state.auth);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [openUserSnackbar, setOpenUserSnackbar] = useState<boolean>(false);
  const [isUserSnackbarError, setIsUserSnackbarError] = useState<boolean>(false);
  const [userSnackbarMessage, setUserSnackbarMessage] = useState<string>('');
  const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState<boolean>(false);
  const [isPasswordSnackbarError, setIsPasswordSnackbarError] = useState<boolean>(false);
  const [passwordSnackbarMessage, setPasswordSnackbarMessage] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { data: userProfile, isLoading, refetch } = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const [login] = useLoginMutation();

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

  const handleCloseUserSnackbar = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenUserSnackbar(false);
  };

  const handleClosePasswordSnackbar = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPasswordSnackbar(false);
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

      if (!userProfile?.id || !userProfile?.version) {
        setIsUserSnackbarError(true);
        setUserSnackbarMessage('User profile ID or version is undefined');
        setOpenUserSnackbar(true);
        return;
      }

      await updateUserProfile({
        id: userProfile.id,
        version: userProfile.version,
        actions: updateActions,
      }).unwrap();

      setIsEditMode(false);
      setIsUserSnackbarError(false);
      setUserSnackbarMessage('User profile updated successfully');
      setOpenUserSnackbar(true);
      refetch();
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      const errorResponse = fetchError.data as ErrorResponse;

      setIsUserSnackbarError(true);
      setUserSnackbarMessage(errorResponse?.message || 'Failed to update user profile');
      setOpenUserSnackbar(true);
    }
  };

  const handleChangePassword = async (values: PasswordFormValues) => {
    try {
      if (!userProfile?.id || !userProfile?.version) {
        setIsPasswordSnackbarError(true);
        setPasswordSnackbarMessage('User profile ID or version is undefined');
        setOpenPasswordSnackbar(true);
        return;
      }

      await changePassword({
        id: userProfile.id,
        version: userProfile.version,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();

      const loginResponse = await login({
        username: userProfile.email,
        password: values.newPassword,
      }).unwrap();

      dispatch(updateClientCredentials(loginResponse));

      setIsPasswordMode(false);
      setIsPasswordSnackbarError(false);
      setPasswordSnackbarMessage('Password changed successfully');
      setOpenPasswordSnackbar(true);
      refetch();
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      const errorResponse = fetchError.data as ErrorResponse;

      setIsPasswordSnackbarError(true);
      if (fetchError.status === 401) {
        setPasswordSnackbarMessage(errorResponse?.message || 'Unauthorized. Please log in again.');
      } else if (fetchError.status === 400) {
        setPasswordSnackbarMessage(errorResponse?.message || 'Bad request. Please check your inputs.');
      } else {
        setPasswordSnackbarMessage(errorResponse?.message || 'Failed to change password');
      }
      setOpenPasswordSnackbar(true);
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
                      open={openUserSnackbar}
                      autoHideDuration={4000}
                      onClose={handleCloseUserSnackbar}
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      {isUserSnackbarError ? (
                        <Alert onClose={handleCloseUserSnackbar} severity='error' variant='filled'>
                          {userSnackbarMessage}
                        </Alert>
                      ) : (
                        <Alert onClose={handleCloseUserSnackbar} severity='success' variant='filled'>
                          User profile updated successfully.
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
          <Card>
            <CardContent>
              <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} mb={3}>
                <Typography variant='h5' component='div' gutterBottom>
                  Change Password
                </Typography>
                <Button variant='outlined' onClick={() => setIsPasswordMode(!isPasswordMode)}>
                  {isPasswordMode ? 'Cancel' : 'Change Password'}
                </Button>
              </Box>
              {isPasswordMode && (
                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                  }}
                  validationSchema={changePasswordSchema}
                  onSubmit={handleChangePassword}
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
                          name='currentPassword'
                          label='Current Password'
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={values.currentPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.currentPassword && Boolean(errors.currentPassword)}
                          helperText={touched.currentPassword && errors.currentPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge='end'>
                                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          fullWidth
                          name='newPassword'
                          label='New Password'
                          type={showNewPassword ? 'text' : 'password'}
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.newPassword && Boolean(errors.newPassword)}
                          helperText={touched.newPassword && errors.newPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge='end'>
                                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          fullWidth
                          name='confirmNewPassword'
                          label='Confirm New Password'
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          value={values.confirmNewPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
                          helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                  edge='end'
                                >
                                  {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button
                          variant='contained'
                          color='primary'
                          type='submit'
                          sx={{ mt: 2 }}
                          disabled={!dirty || isSubmitting}
                        >
                          Save Password
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
              <Snackbar
                open={openPasswordSnackbar}
                autoHideDuration={4000}
                onClose={handleClosePasswordSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {isPasswordSnackbarError ? (
                  <Alert onClose={handleClosePasswordSnackbar} severity='error' variant='filled'>
                    {passwordSnackbarMessage}
                  </Alert>
                ) : (
                  <Alert onClose={handleClosePasswordSnackbar} severity='success' variant='filled'>
                    Password changed successfully.
                  </Alert>
                )}
              </Snackbar>
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
