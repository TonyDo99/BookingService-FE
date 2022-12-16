import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// @mui
import { Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import { AccountContext } from '../../context/AccountContext';
import { findUser } from '../../api/index';
import LanguagePopover from '../dashboard/header/LanguagePopover';
import NotificationsPopover from '../dashboard/header/NotificationsPopover';
import AccountPopover from '../dashboard/header/AccountPopover';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

// ----------------------------------------------------------------------

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function Home() {
  const [account, setAccount] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setAccount(await findUser(navigate));
    })();
  }, [navigate]);
  return (
    <>
      <AccountContext.Provider value={account}>
        <Helmet>
          <title> Welcome: Client | Minimal UI </title>
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} paddingTop="50px">
            <Typography variant="h4" gutterBottom color={'blue'}>
              {account.fullName} welcome you back !
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 0.5,
                sm: 1,
              }}
            >
              <LanguagePopover />
              <NotificationsPopover />
              <AccountPopover />
            </Stack>
          </Stack>
          <Main>
            <Outlet />
          </Main>
        </Container>
      </AccountContext.Provider>
    </>
  );
}
