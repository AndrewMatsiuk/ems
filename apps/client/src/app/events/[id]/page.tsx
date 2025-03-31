'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EventItem, eventService } from '@/services/eventService';
import { Box, Typography, CircularProgress, Chip, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

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
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {event.title}
      </Typography>
      <img src={event.imageUrl} alt={event.title} style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }} />
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
    </Box>
  );
}
