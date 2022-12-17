import { useState, useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import { useNavigate } from 'react-router-dom';
import { findUser } from '../../../api';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const [account, setAccount] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setAccount(await findUser(navigate));
    })();
  }, [navigate]);

  return (
    <StyledRoot>
      <Badge showZero={false} badgeContent={5} color="primary" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </StyledRoot>
  );
}
