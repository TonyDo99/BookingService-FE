import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { useState } from 'react';
import PopupModal from '../../../components/modal/Popup';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { deleteTicket } from '../../../api';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  ticket: PropTypes.object,
};

export default function ShopProductCard({ ticket }) {
  const { name, price, description, quantity, _id } = ticket;

  const [deleted, setDeleted] = useState(null);

  const handleDelete = async (_id) => {
    await deleteTicket(_id, setDeleted);
  };
  return (
    <>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <Label
            className="tracking-wider"
            variant="filled"
            color={'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {description}
          </Label>
          <StyledProductImg alt={name} src={'/assets/images/products/product_1.jpg'} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <div className="w-full flex justify-between items-center">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Button variant="outlined" size="small" onClick={() => handleDelete(_id)}>
              Delete
            </Button>
          </div>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">Qty: +{quantity}</Typography>
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {price && fCurrency(price)}
              </Typography>
              &nbsp;
              {fCurrency(price)}
            </Typography>
          </Stack>
        </Stack>
      </Card>
      {deleted !== null && <PopupModal status={deleted} setStatusRegister={setDeleted} />}
    </>
  );
}
