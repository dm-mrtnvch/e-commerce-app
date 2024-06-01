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
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../redux/services/me.ts';
import { useLoginMutation } from '../../redux/services/auth.ts';
import { updateClientCredentials } from '../../redux/features/authSlice.ts';
import { changePasswordSchema, editProfileSchema, addressChangeSchema } from '../../helpers/validationHelper.ts';
import { Address } from '../../types/auth.ts';
import { ChangeUserInfo } from '../../types/me.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { COUNTRIES_ENUM } from '../Registration/constants.ts';

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

export interface AddressFormValuesType {
  id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  addressType?: 'shipping' | 'billing';
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
  const [isAddressMode, setIsAddressMode] = useState(false);
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const [openUserSnackbar, setOpenUserSnackbar] = useState<boolean>(false);
  const [isUserSnackbarError, setIsUserSnackbarError] = useState<boolean>(false);
  const [userSnackbarMessage, setUserSnackbarMessage] = useState<string>('');
  const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState<boolean>(false);
  const [isPasswordSnackbarError, setIsPasswordSnackbarError] = useState<boolean>(false);
  const [passwordSnackbarMessage, setPasswordSnackbarMessage] = useState<string>('');
  const [openAddressSnackbar, setOpenAddressSnackbar] = useState<boolean>(false);
  const [isAddressSnackbarError, setIsAddressSnackbarError] = useState<boolean>(false);
  const [addressSnackbarMessage, setAddressSnackbarMessage] = useState<string>('');
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

  const handleCloseAddressSnackbar = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAddressSnackbar(false);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleAddAddressToggle = () => {
    setEditAddressId(null);
    setIsAddressMode(!isAddressMode);
  };

  const handleEditAddressToggle = (address: Address) => {
    setEditAddressId(address.id as string);
    setIsAddressMode(true);
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

  const handleSaveAddress = async (values: AddressFormValuesType) => {
    try {
      if (!userProfile?.id || !userProfile?.version) {
        setIsAddressSnackbarError(true);
        setAddressSnackbarMessage('User profile ID or version is undefined');
        setOpenAddressSnackbar(true);
        return;
      }

      const addressValues = {
        streetName: values.streetName,
        city: values.city,
        postalCode: values.postalCode,
        country: values.country,
      };

      if (editAddressId) {
        // edit existing address
        await updateUserProfile({
          id: userProfile.id,
          version: userProfile.version,
          actions: [
            {
              action: 'changeAddress',
              addressId: editAddressId,
              address: addressValues,
            },
          ],
        }).unwrap();

        setEditAddressId(null);
      } else {
        // add new address
        const addAddressResponse = await updateUserProfile({
          id: userProfile.id,
          version: userProfile.version,
          actions: [
            {
              action: 'addAddress',
              address: addressValues,
            },
          ],
        }).unwrap();

        const newAddressId = addAddressResponse.addresses[addAddressResponse.addresses.length - 1].id;

        const updateActions: ChangeUserInfo[] = [];
        if (values.addressType === 'shipping') {
          updateActions.push({
            action: 'addShippingAddressId',
            addressId: newAddressId as string,
          } as const);
        }

        if (values.addressType === 'billing') {
          updateActions.push({
            action: 'addBillingAddressId',
            addressId: newAddressId as string,
          } as const);
        }

        if (!userProfile.id || !addAddressResponse.version) {
          setIsAddressSnackbarError(true);
          setAddressSnackbarMessage('Cannot save address');
          setOpenAddressSnackbar(true);
          return;
        }

        await updateUserProfile({
          id: userProfile.id,
          version: addAddressResponse.version,
          actions: updateActions,
        }).unwrap();
      }

      setIsAddressMode(false);
      setIsAddressSnackbarError(false);
      setAddressSnackbarMessage(editAddressId ? 'Address updated successfully' : 'Address added successfully');
      setOpenAddressSnackbar(true);
      refetch();
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      const errorResponse = fetchError.data as ErrorResponse;

      setIsAddressSnackbarError(true);
      setAddressSnackbarMessage(errorResponse?.message || 'Failed to update address');
      setOpenAddressSnackbar(true);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      if (!userProfile?.id || !userProfile?.version) {
        setIsAddressSnackbarError(true);
        setAddressSnackbarMessage('User profile ID or version is undefined');
        setOpenAddressSnackbar(true);
        return;
      }

      await updateUserProfile({
        id: userProfile.id,
        version: userProfile.version,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      }).unwrap();

      setIsAddressSnackbarError(false);
      setAddressSnackbarMessage('Address deleted successfully');
      setOpenAddressSnackbar(true);
      refetch();
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      const errorResponse = fetchError.data as ErrorResponse;

      setIsAddressSnackbarError(true);
      setAddressSnackbarMessage(errorResponse?.message || 'Failed to delete address');
      setOpenAddressSnackbar(true);
    }
  };

  const handleSetDefaultShippingAddress = async (addressId: string) => {
    try {
      if (!userProfile?.id || !userProfile?.version) {
        setIsAddressSnackbarError(true);
        setAddressSnackbarMessage('User profile ID or version is undefined');
        setOpenAddressSnackbar(true);
        return;
      }

      await updateUserProfile({
        id: userProfile.id,
        version: userProfile.version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId,
          },
        ],
      }).unwrap();

      setIsAddressSnackbarError(false);
      setAddressSnackbarMessage('Default shipping address updated successfully');
      setOpenAddressSnackbar(true);
      refetch();
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      const errorResponse = fetchError.data as ErrorResponse;

      setIsAddressSnackbarError(true);
      setAddressSnackbarMessage(errorResponse?.message || 'Failed to update default shipping address');
      setOpenAddressSnackbar(true);
    }
  };

  const handleSetDefaultBillingAddress = async (addressId: string) => {
    try {
      if (!userProfile?.id || !userProfile?.version) {
        setIsAddressSnackbarError(true);
        setAddressSnackbarMessage('User profile ID or version is undefined');
        setOpenAddressSnackbar(true);
        return;
      }

      await updateUserProfile({
        id: userProfile.id,
        version: userProfile.version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId,
          },
        ],
      }).unwrap();

      setIsAddressSnackbarError(false);
      setAddressSnackbarMessage('Default billing address updated successfully');
      setOpenAddressSnackbar(true);
      refetch();
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      const errorResponse = fetchError.data as ErrorResponse;

      setIsAddressSnackbarError(true);
      setAddressSnackbarMessage(errorResponse?.message || 'Failed to update default billing address');
      setOpenAddressSnackbar(true);
    }
  };

  const renderAddressCards = (addresses: Address[], type: 'shipping' | 'billing') => {
    return addresses.map((address, index) => (
      <Card
        key={address.id}
        sx={{
          backgroundColor:
            address.id === userProfile?.defaultShippingAddressId || address.id === userProfile?.defaultBillingAddressId
              ? '#D0ECFE'
              : 'white',
          marginBottom: 2,
        }}
      >
        <CardContent>
          {editAddressId === address.id ? (
            <Formik
              initialValues={{
                id: address.id,
                streetName: address.streetName,
                city: address.city,
                postalCode: address.postalCode,
                country: address.country,
                addressType: type,
              }}
              validationSchema={addressChangeSchema}
              onSubmit={handleSaveAddress}
            >
              {({ values, handleChange, handleBlur, errors, touched, isSubmitting, dirty, setFieldValue }) => (
                <Form>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      name='streetName'
                      label='Street Name'
                      value={values.streetName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.streetName && Boolean(errors.streetName)}
                      helperText={touched.streetName && errors.streetName}
                    />
                    <TextField
                      fullWidth
                      name='city'
                      label='City'
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    />
                    <TextField
                      fullWidth
                      name='postalCode'
                      label='Postal Code'
                      value={values.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      helperText={touched.postalCode && errors.postalCode}
                    />
                    <FormControl fullWidth error={touched.country && Boolean(errors.country)}>
                      <InputLabel id='country-label'>Country</InputLabel>
                      <Select
                        labelId='country-label'
                        id='country'
                        name='country'
                        value={values.country}
                        onChange={(event) => setFieldValue('country', event.target.value)}
                        onBlur={handleBlur}
                        label='Country'
                      >
                        {Object.entries(COUNTRIES_ENUM).map(([countryName, countryCode]) => (
                          <MenuItem key={countryCode} value={countryCode}>
                            {countryName}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.country && errors.country && (
                        <Typography variant='subtitle2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                          {errors.country}
                        </Typography>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={touched.addressType && Boolean(errors.addressType)}>
                      <InputLabel id='addressType-label'>Address Type</InputLabel>
                      <Select
                        labelId='addressType-label'
                        id='addressType'
                        name='addressType'
                        value={values.addressType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Address Type'
                        disabled={!!editAddressId}
                      >
                        <MenuItem value='shipping'>Shipping</MenuItem>
                        <MenuItem value='billing'>Billing</MenuItem>
                      </Select>
                      {touched.addressType && errors.addressType && (
                        <Typography variant='subtitle2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                          {errors.addressType}
                        </Typography>
                      )}
                    </FormControl>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                      }}
                    >
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        sx={{ mt: 0 }}
                        disabled={!dirty || isSubmitting}
                      >
                        Save Address
                      </Button>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => {
                          setEditAddressId(null);
                          setIsAddressMode(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Typography variant='h6' component='div' gutterBottom>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Address {index + 1}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  {address.id === userProfile?.defaultShippingAddressId && (
                    <Chip label='Default Shipping' color='primary' variant='outlined' />
                  )}
                  {address.id === userProfile?.defaultBillingAddressId && (
                    <Chip label='Default Billing' color='primary' variant='outlined' />
                  )}
                  <IconButton onClick={() => handleEditAddressToggle(address)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAddress(address.id as string)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  paddingLeft: { xs: 0, ms: 2 },
                  marginTop: 2,
                }}
              >
                <Typography variant='body1'>
                  <strong>Street Name:</strong> {address.streetName || 'not indicated'}
                </Typography>
                <Typography variant='body1'>
                  <strong>City:</strong> {address.city || 'not indicated'}
                </Typography>
                <Typography variant='body1'>
                  <strong>Postal Code:</strong> {address.postalCode || 'not indicated'}
                </Typography>
                <Typography variant='body1'>
                  <strong>Country:</strong> {address.country || 'not indicated'}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-end' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 2 },
                  mt: 1,
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleSetDefaultShippingAddress(address.id as string)}
                  disabled={address.id === userProfile?.defaultShippingAddressId}
                >
                  Set as Default Shipping
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleSetDefaultBillingAddress(address.id as string)}
                  disabled={address.id === userProfile?.defaultBillingAddressId}
                >
                  Set as Default Billing
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    ));
  };

  const defaultShippingAddress = userProfile?.addresses.find(
    (address) => address.id === userProfile?.defaultShippingAddressId,
  );
  const defaultBillingAddress = userProfile?.addresses.find(
    (address) => address.id === userProfile?.defaultBillingAddressId,
  );

  const shippingAddresses = userProfile?.shippingAddressIds
    ? [
        ...(defaultShippingAddress ? [defaultShippingAddress] : []),
        ...userProfile.addresses.filter(
          (address) =>
            userProfile.shippingAddressIds?.includes(address.id as string) &&
            address.id !== userProfile.defaultShippingAddressId,
        ),
      ]
    : [];

  const billingAddresses = userProfile?.billingAddressIds
    ? [
        ...(defaultBillingAddress ? [defaultBillingAddress] : []),
        ...userProfile.addresses.filter(
          (address) =>
            userProfile.billingAddressIds?.includes(address.id as string) &&
            address.id !== userProfile.defaultBillingAddressId,
        ),
      ]
    : [];

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <CircularProgress size={45} />
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
          <Card>
            <CardContent>
              <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} mb={3}>
                <Typography variant='h5' component='div' gutterBottom>
                  Manage Addresses
                </Typography>
                <Button variant='outlined' onClick={handleAddAddressToggle}>
                  {isAddressMode && !editAddressId ? 'Cancel' : '+ Add Address'}
                </Button>
              </Box>
              {isAddressMode && !editAddressId && (
                <Formik
                  initialValues={{
                    streetName: '',
                    city: '',
                    postalCode: '',
                    country: '',
                    addressType: 'shipping',
                  }}
                  validationSchema={addressChangeSchema}
                  onSubmit={handleSaveAddress}
                >
                  {({ values, handleChange, handleBlur, errors, touched, isSubmitting, dirty, setFieldValue }) => (
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
                          mb: 4,
                        }}
                      >
                        <TextField
                          fullWidth
                          name='streetName'
                          label='Street Name'
                          value={values.streetName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.streetName && Boolean(errors.streetName)}
                          helperText={touched.streetName && errors.streetName}
                        />
                        <TextField
                          fullWidth
                          name='city'
                          label='City'
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                        <TextField
                          fullWidth
                          name='postalCode'
                          label='Postal Code'
                          value={values.postalCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.postalCode && Boolean(errors.postalCode)}
                          helperText={touched.postalCode && errors.postalCode}
                        />
                        <FormControl fullWidth error={touched.country && Boolean(errors.country)}>
                          <InputLabel id='country-label'>Country</InputLabel>
                          <Select
                            labelId='country-label'
                            id='country'
                            name='country'
                            value={values.country}
                            onChange={(event) => setFieldValue('country', event.target.value)}
                            onBlur={handleBlur}
                            label='Country'
                          >
                            {Object.entries(COUNTRIES_ENUM).map(([countryName, countryCode]) => (
                              <MenuItem key={countryCode} value={countryCode}>
                                {countryName}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.country && errors.country && (
                            <Typography variant='subtitle2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                              {errors.country}
                            </Typography>
                          )}
                        </FormControl>
                        <FormControl fullWidth error={touched.addressType && Boolean(errors.addressType)}>
                          <InputLabel id='addressType-label'>Address Type</InputLabel>
                          <Select
                            labelId='addressType-label'
                            id='addressType'
                            name='addressType'
                            value={values.addressType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label='Address Type'
                          >
                            <MenuItem value='shipping'>Shipping</MenuItem>
                            <MenuItem value='billing'>Billing</MenuItem>
                          </Select>
                          {touched.addressType && errors.addressType && (
                            <Typography variant='subtitle2' color='error' ml={2} mt={0.5} fontSize={'12px'}>
                              {errors.addressType}
                            </Typography>
                          )}
                        </FormControl>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            sx={{ mt: 0 }}
                            disabled={!dirty || isSubmitting}
                          >
                            Save Address
                          </Button>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
              <Typography variant='h6' gutterBottom mb={3}>
                Shipping Addresses
              </Typography>
              {renderAddressCards(shippingAddresses, 'shipping')}

              <Typography variant='h6' gutterBottom mt={6} mb={3}>
                Billing Addresses
              </Typography>
              {renderAddressCards(billingAddresses, 'billing')}
              <Snackbar
                open={openAddressSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseAddressSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {isAddressSnackbarError ? (
                  <Alert onClose={handleCloseAddressSnackbar} severity='error' variant='filled'>
                    {addressSnackbarMessage}
                  </Alert>
                ) : (
                  <Alert onClose={handleCloseAddressSnackbar} severity='success' variant='filled'>
                    {addressSnackbarMessage}
                  </Alert>
                )}
              </Snackbar>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
