import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { useParams } from 'react-router-dom';
import { ProductSort, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
import { fetchEventById } from '../../api/index';
import { TicketList } from '../../sections/@home/ticket';

// ----------------------------------------------------------------------

// TODO: Sent props tickets to this component right now is set events.
export default function TicketsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const [events, setEvents] = useState([]);

  const { _id } = useParams();

  useEffect(() => {
    (async () => {
      setEvents(await fetchEventById(_id));
    })();
  }, [_id]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Tickets | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Tickets
        </Typography>

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
        {events.length && <TicketList tickets={events[0].ticket} />}
        <ProductCartWidget />
      </Container>
    </>
  );
}
