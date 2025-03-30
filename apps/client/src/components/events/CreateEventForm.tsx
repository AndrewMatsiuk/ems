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
import { useState } from 'react';
import { CreateEventDto } from '@/services/eventService';
import { useEventContext } from '@/context/EventContext';
import toast from 'react-hot-toast';

const categories = ['Business', 'Education', 'Music', 'Sports', 'Food', 'Arts'];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateEventModal({ open, onClose }: Props) {
  const [form, setForm] = useState<CreateEventDto & { time: string }>({
    title: '',
    date: '',
    time: '',
    category: '',
    location: '',
    description: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);

  const { createEvent } = useEventContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: '',
      date: '',
      time: '',
      category: '',
      location: '',
      description: '',
      imageUrl:'',
    });
  };

  const handleSubmit = async () => {
    const { title, date, time, category, location, description } = form;
  
    if (!title || !date || !time || !category || !location || !description ) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    setLoading(true);
    try {
      await createEvent({
        ...form,
        date: `${form.date} ${form.time}`,
      });
      toast.success('Event created successfully!');
      resetForm();
      onClose();
    } catch (err) {
      toast.error('Failed to create event');
      console.error('Failed to create event', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12}}>
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6}}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6}}>
            <TextField
              fullWidth
              label="Time"
              name="time"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={form.time}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12}}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12}}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12}}>
            <TextField
              multiline
              rows={3}
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12}}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
