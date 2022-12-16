import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Grid } from '@mui/material';

// components
import { fetchEvents } from '../../api/index';
import { EventsClient } from '../../sections/@home/event';

// ----------------------------------------------------------------------

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setEvents(await fetchEvents());
    })();
  }, [navigate]);
  return (
    <>
      <Grid container spacing={3}>
        {events.map((event, index) => event.published && <EventsClient key={event._id} event={event} index={index} />)}
      </Grid>
    </>
  );
}
