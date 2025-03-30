'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { EventItem } from '@/services/eventService';
import { useEventContext } from '@/context/EventContext';
import toast from 'react-hot-toast';

const categories = ['Business', 'Education', 'Music', 'Sports', 'Food', 'Arts'];

interface Props {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
}

export default function EditEventModal({ open, onClose, event }: Props) {
  const { updateEvent } = useEventContext();

  const [form, setForm] = useState<EventItem | null>(null);

  useEffect(() => {
    if (event) {
      setForm({ ...event });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form) return;
    try {
      await updateEvent(form.id, form);
      toast.success('Event updated successfully');
      onClose();
    } catch (err) {
      toast.error('Failed to update event '); 
      console.error(err);
    }
  };

  if (!form) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              value={form.title || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Date & Time"
              name="date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={form.date ? form.date.slice(0, 16) : ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={form.category || ''}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={3}
              fullWidth
              label="Description"
              name="description"
              value={form.description || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Update Event
        </Button>
      </DialogActions>
    </Dialog>
  );
}
