import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Card, Stack, Typography } from '@mui/material';
import { fDate } from '../../utils/formatTime';

export default function TemporaryDrawer({ open, setOpen, tickets }) {
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;

    setOpen(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {tickets.length === 0
        ? 'Empty cart'
        : tickets.map((ticket) => (
            <Card
              key={ticket._id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100px',
                  position: 'relative',
                  width: '30%',
                  pl: '10px',
                }}
              >
                <img style={{ height: 'fit-content' }} alt={'asdas'} src={'/assets/images/ticket/ticket.png'} />
              </Box>

              <Stack spacing={2} sx={{ width: '70%', paddingX: '15px' }}>
                <Typography variant="overline" sx={{ color: 'blueviolet' }}>
                  Name: {ticket.name}
                </Typography>
                <Typography variant="overline" sx={{ color: 'blue' }} noWrap>
                  Time: {ticket.description}
                </Typography>
                <Typography variant="overline" sx={{ color: 'green' }}>
                  ${ticket.price}
                </Typography>
                <Typography variant="overline" sx={{ color: 'red' }} noWrap>
                  End: {fDate(ticket.date)}
                </Typography>
              </Stack>
            </Card>
          ))}
    </Box>
  );

  return (
    <div>
      <Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={() => setOpen(!open)}>
          {list('right')}
        </Drawer>
      </Fragment>
    </div>
  );
}
