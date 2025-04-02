import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventService } from '../services/event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() data: CreateEventDto) {
    return this.eventService.create(data);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('date') date?: string,
  ) {
    return this.eventService.findAll({ category, date });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateEventDto>) {
    return this.eventService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.delete(+id);
  }
}
