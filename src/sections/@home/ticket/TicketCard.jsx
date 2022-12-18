import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { useState } from 'react';
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { BuyingModal } from '../../../components/modal';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'none',
  position: 'absolute',
});

// ----------------------------------------------------------------------

TicketCard.propTypes = {
  ticket: PropTypes.object,
};

export default function TicketCard({ ticket }) {
  const [click, setClick] = useState(false);
  const { name, price, quantity, date } = ticket;
  return (
    <>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <Label
            className="tracking-wider"
            variant="filled"
            color={'error'}
            sx={{
              zIndex: 9,
              top: 16,
              left: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            End: {fDate(date)}
          </Label>
          <StyledProductImg alt={name} src={'/assets/images/ticket/ticket.png'} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <div className="flex justify-between items-center">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setClick(true)}>
              Add
            </Button>
          </div>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">Qty: {quantity}</Typography>
            {fCurrency(price)}
          </Stack>
        </Stack>
      </Card>

      {click && <BuyingModal ticket={ticket} open={click} setClick={setClick} />}
    </>
  );
}
