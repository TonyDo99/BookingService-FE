import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import TicketCard from './TicketCard';

// ----------------------------------------------------------------------

TicketList.propTypes = {
  tickets: PropTypes.array.isRequired,
};

export default function TicketList({ tickets, ...other }) {
  return (
    <>
      <Grid container spacing={3} {...other}>
        {tickets.map((ticket) => (
          <Grid key={ticket._id} item xs={12} sm={6} md={3}>
            <TicketCard ticket={ticket} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
