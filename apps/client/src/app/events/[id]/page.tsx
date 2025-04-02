'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { eventService } from '@/services/eventService';
import { Box, Typography, CircularProgress, Chip, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import dynamic from 'next/dynamic';
import { EventItem } from '@/types';
import { useEventContext } from '@/context/EventContext';
import EventCard from '@/components/events/EventCard';

const EventMap = dynamic(() => import('@/components/map/EventMap'), {
  ssr: false,
});

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { events } = useEventContext();

  const similarEvents = event
    ? events
        .filter((e) => e.category === event.category && e.id !== event.id)
        .slice(0, 6)
    : [];

  useEffect(() => {
    if (!id) return;

    eventService
      .getById(Number(id))
      .then(setEvent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!event) return <Typography>Event not found.</Typography>;

  return (
    <Box p={4}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {event.title}
      </Typography>
      <img
        src={event.imageUrl}
        alt={event.title}
        style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
      />
      <Chip label={event.category} sx={{ mt: 2 }} />
      <Typography variant="body1" mt={2}>
        <strong>Date:</strong> {event.date}
      </Typography>
      <Typography variant="body1" mt={1}>
        <strong>Location:</strong> {event.location}
      </Typography>
      <Typography variant="body1" mt={2}>
        {event.description}
      </Typography>
      {event.latitude && event.longitude && (
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Event Location on Map
          </Typography>
          <EventMap events={[event]} fullScreen={false} />
        </Box>
      )}
      {similarEvents.length > 0 && (
        <Box mt={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Similar Events
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={2}
          >
            {similarEvents.map((similar) => (
              <EventCard key={similar.id} {...similar} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
