export interface EventItem {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    description: string;
    imageUrl: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface CreateEventDtoI {
    title: string;
    date: string;
    location: string;
    category: string;
    description: string;
    imageUrl: string;
    latitude?: number;
    longitude?: number;
  }

  export type CreateEventDto = Omit<EventItem, 'id'>;

 export interface EventContextType {
    events: EventItem[];
    fetchEvents: () => void;
    createEvent: (data: CreateEventDto) => Promise<void>;
    updateEvent: (id: number, data: Partial<EventItem>) => Promise<void>;
    deleteEvent: (id: number) => Promise<void>;
  }