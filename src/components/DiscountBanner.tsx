import { Card, CardContent, Grid, Typography } from '@mui/material';

interface Props {
  title: string;
  description: string;
  code?: string;
  asset?: string;
}

const DiscountBanner = ({ title, description, code, asset }: Props) => {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='h2' component='h2' gutterBottom>
              {title}
            </Typography>
            <Typography variant='h6' component='p' color='textSecondary' gutterBottom>
              {description}
            </Typography>
            {code && (
              <Typography variant='h6' component='p' color='textSecondary'>
                Use code <strong>{code}</strong> at checkout
              </Typography>
            )}
          </Grid>
          {asset && (
            <Grid item xs={12} sm={12} md={6}>
              <img src={asset} alt='Discount' style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DiscountBanner;
