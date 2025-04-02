'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import { LatLngExpression } from 'leaflet';
import { EventItem } from '@/types';

interface Props {
  events: EventItem[];
  fullScreen: boolean
}

export default function EventMap({ events,fullScreen }: Props) {
  const defaultPosition: LatLngExpression = [48.3794, 31.1656]; //Kyiv

  return (
    <MapContainer
      center={defaultPosition}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: fullScreen ? '100vh' : '400px', width: '100%' }}

    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {events.map((event) => (
        event.latitude && event.longitude && (
          <Marker key={event.id} position={[event.latitude, event.longitude]}>
<Popup minWidth={250}>
  <div style={{ fontFamily: 'Arial, sans-serif' }}>
    {event.imageUrl && (
      <img
        src={event.imageUrl}
        alt={event.title}
        style={{
          width: '100%',
          height: '120px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '8px',
        }}
      />
    )}

    <h1 style={{ margin: 0,fontSize: '18px' }}>{event.title}</h1>
    <p style={{ margin: '4px 0', fontSize: '14px', color: '#555' }}>
      📍 <strong>{event.location}</strong><br />
      📅 {event.date}<br />
      🏷️ {event.category}
    </p>

    {event.description && (
      <p style={{ fontSize: '13px', color: '#666', marginTop: 8 }}>
        {event.description.length > 100
          ? event.description.slice(0, 100) + '...'
          : event.description}
      </p>
    )}
  </div>
</Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}
