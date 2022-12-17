import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import { CreateTicketForm } from '../components/modal';
import { fetchListTickets } from '../api/index';
import Iconify from '../components/iconify';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    (async () => {
      setTickets(await fetchListTickets());
    })();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Ticket | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tickets
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenForm(true)}>
            New Ticket
          </Button>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList tickets={tickets} />
        <ProductCartWidget />
      </Container>
      {openForm && <CreateTicketForm open={openForm} setOpen={setOpenForm} />}
    </>
  );
}
