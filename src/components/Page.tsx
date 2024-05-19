import { styled } from '@mui/material';
import { forwardRef, HTMLAttributes, LegacyRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header.tsx';

const Box = styled('div')(() => ({
  minHeight: '100vh',
  position: 'relative',
  paddingTop: '80px',
}));

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | ReactNode[];
  title: string;
}

/**
 * Component for rendering a page with a title.
 *
 * @component
 * @param {ReactNode} children - The content to be rendered inside the page.
 * @param {string} title - The title of the page.
 * @param {object} other - Any other props to be passed to the underlying Box component.
 * @returns {React.ReactElement} The rendered page component.
 */

const projectName = import.meta.env.VITE_PROJECT_NAME;

const Page = forwardRef(({ children, title = '', ...other }: PageProps, ref: LegacyRef<HTMLDivElement> | undefined) => (
  <>
    <Helmet>
      <title>{`${title} | ${projectName} | RS School`}</title>
    </Helmet>
    <Header />
    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
Page.displayName = 'Page';
