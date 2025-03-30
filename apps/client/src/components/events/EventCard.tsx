'use client';

import {
  CalendarToday,
  LocationOn,
  Edit,
  Delete,
  Share,
  BookmarkBorder,
  MoreVert,
} from '@mui/icons-material';
import {
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material';
import { useEventContext } from '@/context/EventContext';
import { useState } from 'react';
import EditEventModal from './EditEventModal'; 
import toast from 'react-hot-toast';

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  category,
  description,
  imageUrl,
}: EventCardProps) {
  const { deleteEvent } = useEventContext();
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
        try {
            await deleteEvent(id);
            toast.success('Event deleted');
          } catch (err) {
            toast.error('Failed to delete event');
            console.error('Delete error:', err);
          }
    }
  };

  return (
    <>
      <Card className="rounded shadow-md">
        <CardMedia component="img" height="150" sx={{maxHeight:250}}  image={imageUrl} alt={title} />
        <CardContent>
          <Chip label={category} size="small" className="mb-2" />
          <Typography gutterBottom variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <CalendarToday fontSize="small" className="mr-1" />
            {date}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <LocationOn fontSize="small" className="mr-1" />
            {location}
          </div>
          <Typography variant="body2" color="text.secondary" className="line-clamp-3">
            {description}
          </Typography>
        </CardContent>
        <CardActions className="justify-between px-3 pb-2">
          <Button size="small" variant="contained">
            View Details
          </Button>
          <div className="flex gap-1">
            <IconButton><Share fontSize="small" /></IconButton>
            <IconButton><BookmarkBorder fontSize="small" /></IconButton>
            <IconButton onClick={() => setEditOpen(true)}><Edit fontSize="small" /></IconButton>
            <IconButton onClick={handleDelete}><Delete fontSize="small" /></IconButton>
            <IconButton><MoreVert fontSize="small" /></IconButton>
          </div>
        </CardActions>
      </Card>
      <EditEventModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        event={{
          id,
          title,
          date,
          location,
          category,
          description,
          imageUrl,
        }}
      />
    </>
  );
}
