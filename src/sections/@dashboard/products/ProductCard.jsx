import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';

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
  const { name, price, description, quantity } = ticket;
  return (
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
        <Link className="cursor-pointer" color="inherit" underline="hover" width={'fit-content'}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

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
  );
}
