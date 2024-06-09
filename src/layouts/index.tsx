import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import { styled } from '@mui/material';

const headerHeight = 80;

const Main = styled('main')(() => ({
  minHeight: `calc(100vh - ${headerHeight}px)`,
  paddingTop: headerHeight,
}));

const Layout = () => {
  return (
    <>
      <Header headerHeight={headerHeight} />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </>
  );
};

export default Layout;
