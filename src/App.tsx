import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './hooks/reduxHooks';
import { useClientCredentialsAnonymousMutation, useClientCredentialsFlowAuthMutation } from './redux/services/auth';
import Routes from './routes';
import { setAnonymousCredentials, setCredentials } from './redux/features/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const [clientCredentialsAnonymous, { isLoading: isLoadingAnonymous }] = useClientCredentialsAnonymousMutation();
  const [clientCredentialsFlowAuth, { isLoading }] = useClientCredentialsFlowAuthMutation();

  useEffect(() => {
    clientCredentialsFlowAuth()
      .unwrap()
      .then((credentials) => {
        dispatch(setCredentials(credentials));
      });

    clientCredentialsAnonymous()
      .unwrap()
      .then((credentials) => {
        dispatch(setAnonymousCredentials(credentials));
      });
  }, [clientCredentialsAnonymous, clientCredentialsFlowAuth, dispatch]);

  return (
    <>
      <Backdrop
        open={isLoading || isLoadingAnonymous}
        sx={{ color: 'var(--mui-palette-common-white)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Routes />
    </>
  );
}

export default App;
