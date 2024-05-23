import { Divider, Link, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';

const projectName = import.meta.env.VITE_PROJECT_NAME;

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const authors = [
    {
      name: 'Dmitry Martynovich',
      github: 'https://github.com/dm-mrtnvch',
    },
    {
      name: 'Valeryia Herasimenka',
      github: 'https://github.com/valeryaosta',
    },
    {
      name: 'Alisher Abdikhaniyev',
      github: 'https://github.com/abdikhaniyev',
    },
  ];

  return (
    <Stack
      sx={{ px: { lg: 5, xs: 2 }, py: 2 }}
      spacing={4}
      component='footer'
      direction='row'
      justifyContent='space-around'
      borderTop={1}
      borderColor='divider'
    >
      <Stack spacing={1}>
        <Typography variant='body1' fontWeight={600}>
          {projectName} | RS School
        </Typography>
        <Typography variant='body1'>&copy; {new Date().getFullYear()} All rights reserved.</Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography variant='body1' fontWeight={600}>
          Authors:
        </Typography>
        <Stack
          spacing={1}
          direction={isSmallScreen ? 'column' : 'row'}
          divider={!isSmallScreen && <Divider orientation='vertical' flexItem />}
        >
          {authors.map((author) => (
            <Typography key={author.name}>
              <Link href={author.github} target='_blank' rel='noreferrer'>
                {author.name}
              </Link>
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
