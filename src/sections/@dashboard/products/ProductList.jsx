import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  tickets: PropTypes.array.isRequired,
};

export default function ProductList({ tickets, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {tickets.map((ticket) => (
        <Grid key={ticket._id} item xs={12} sm={6} md={3}>
          <ShopProductCard ticket={ticket} />
        </Grid>
      ))}
    </Grid>
  );
}
