import { useState } from 'react';
import { Page } from '../../components';
import { ABOUT_US } from '../../routes/routes';
import { styled, Card, CardContent, CardMedia, Typography, Link, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import alisherPhoto from '../../assets/team/alisher.png';
import valeryPhoto from '../../assets/team/valery.png';
import dmitryPhoto from '../../assets/team/dmitry.png';
import rsSchoolLogo from '../../assets/images/logoRss.svg';

const TeamContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  justifyContent: 'center',
  padding: theme.spacing(8, 4),
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  width: 300,
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[6],
  },
}));

const TeamMemberPhoto = styled(CardMedia)(({ theme }) => ({
  height: 200,
  width: '100%',
  borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
}));

const TeamMemberContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const MemberName = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: theme.spacing(1, 0),
}));

const MemberRole = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  textDecoration: 'underline',
}));

const MemberBio = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

const MemberLink = styled(Link)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  marginTop: 'auto',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const LogoImage = styled('img')(() => ({
  width: '150px',
  height: 'auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  outline: 'none',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  github: string;
  contributions: string;
  collaboration: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Alisher Abdikhaniyev',
    role: 'Frontend Developer',
    bio: 'Alisher is a passionate frontend developer with 5 years of experience in building responsive web applications.',
    photo: alisherPhoto,
    github: 'https://github.com/abdikhaniyev',
    contributions:
      'Alisher played a key role in implementing responsive design and enhancing the overall UI/UX of the application. He developed several key features such as the product carousel and user authentication flow, ensuring a seamless user experience across all devices.',
    collaboration:
      'Alisher worked closely with the backend team to integrate APIs efficiently, and he was instrumental in conducting code reviews to maintain code quality and consistency. He also mentored junior developers and facilitated daily stand-ups to track project progress.',
  },
  {
    name: 'Valeryia Herasimenka',
    role: 'Frontend Developer',
    bio: 'Valeryia specializes in creating dynamic and interactive user interfaces with a focus on performance and accessibility with 3+ years of experience.',
    photo: valeryPhoto,
    github: 'https://github.com/valeryaosta',
    contributions:
      'Valeryia contributed significantly to developing and optimizing the performance of the application. She implemented the search functionality, product filtering, and sorting features. Her work ensured that the application remained fast and responsive under heavy user load.',
    collaboration:
      'Valeryia coordinated with designers and other developers to translate design mockups into high-quality code. She also spearheaded the implementation of accessibility features, making sure the application is usable for all users, including those with disabilities.',
  },
  {
    name: 'Dmitry Martynovich',
    role: 'Frontend Developer',
    bio: 'Dmitry is a talented frontend developer with 2 years of experience in building modern web applications.',
    photo: dmitryPhoto,
    github: 'https://github.com/valeryaosta',
    contributions: `Dmitry focused on implementing key frontend features and optimizing the application’s performance. He developed the shopping cart functionality, ensuring a smooth and efficient user experience. Dmitry also worked on improving the application's loading times and responsiveness.`,
    collaboration:
      'Dmitry actively participated in code reviews and collaborative problem solving. He worked alongside other team members to debug issues and implement best practices in frontend development. Dmitry’s proactive approach helped the team to identify and resolve performance bottlenecks early in the development process.',
  },
];

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleOpen = (member: TeamMember) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  return (
    <Page title={ABOUT_US.title}>
      <TeamContainer>
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} onClick={() => handleOpen(member)}>
            <TeamMemberPhoto image={member.photo} title={member.name} />
            <TeamMemberContent>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
              <MemberLink
                href={member.github}
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => e.stopPropagation()}
              >
                GitHub Profile
              </MemberLink>
            </TeamMemberContent>
          </TeamMemberCard>
        ))}
      </TeamContainer>
      <LogoContainer>
        <Link href='https://rs.school/' target='_blank' rel='noopener noreferrer'>
          <LogoImage src={rsSchoolLogo} alt='RS School Logo' />
        </Link>
      </LogoContainer>
      <Modal open={open} onClose={handleClose}>
        <ModalContent>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          {selectedMember && (
            <>
              <Typography variant='h4' sx={{ marginBottom: '1rem', maxWidth: '80%', textAlign: 'center' }}>
                {selectedMember.name}
              </Typography>
              <Typography variant='body2' paragraph>
                <strong>Contributions:</strong> {selectedMember.contributions}
              </Typography>
              <Typography variant='body2' paragraph>
                <strong>Collaboration:</strong> {selectedMember.collaboration}
              </Typography>
            </>
          )}
        </ModalContent>
      </Modal>
    </Page>
  );
};

export default AboutUs;
