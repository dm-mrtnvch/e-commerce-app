import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks.tsx';
import { useGetUserProfileQuery } from '../../redux/services/me.ts';
import { Box, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { Address } from '../../types/auth.ts';
import { HOME } from '../../routes/routes.tsx';

const UserPage = () => {
  const navigate = useNavigate();
  const { clientCredentials } = useAppSelector((state) => state.auth);

  const { data: userProfile } = useGetUserProfileQuery();

  useEffect(() => {
    if (clientCredentials && !('refresh_token' in clientCredentials)) {
      navigate(HOME.path, { replace: true });
    }
  }, [clientCredentials, navigate]);

  const shippingAddresses = userProfile?.addresses.filter((address) =>
    userProfile?.shippingAddressIds?.includes(address.id as string),
  );
  const billingAddresses = userProfile?.addresses.filter((address) =>
    userProfile?.billingAddressIds?.includes(address.id as string),
  );

  return (
    <Container maxWidth='md' sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='div' gutterBottom>
                Personal Information
              </Typography>
              <Typography variant='body1'>
                <strong>First Name: </strong> {userProfile?.firstName}
              </Typography>
              <Typography variant='body1'>
                <strong>Last Name: </strong> {userProfile?.lastName}
              </Typography>
              <Typography variant='body1'>
                <strong>Date of Birth: </strong> {userProfile?.dateOfBirth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {shippingAddresses?.map((address: Address, index) => (
            <Card
              key={address.id}
              sx={{
                marginBottom: 2,
                backgroundColor: address.id === userProfile?.defaultShippingAddressId ? '#D0ECFE' : 'white',
              }}
            >
              <CardContent>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography variant='h6' component='div' gutterBottom>
                    Shipping Address {index + 1}
                  </Typography>
                  {address.id === userProfile?.defaultShippingAddressId && (
                    <Chip label='Default Shipping' color='primary' variant='outlined' sx={{ padding: 1 }} />
                  )}
                </Box>
                <Box sx={{ paddingLeft: 2 }}>
                  <Typography variant='body1'>
                    <strong>Street Name:</strong> {address.streetName}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>City:</strong> {address.city}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>State:</strong> {address.state}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Postal Code:</strong> {address.postalCode}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Country:</strong> {address.country}
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
                    <strong>Street Name:</strong> {address.streetName}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>City:</strong> {address.city}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>State:</strong> {address.state}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Postal Code:</strong> {address.postalCode}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Country:</strong> {address.country}
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
