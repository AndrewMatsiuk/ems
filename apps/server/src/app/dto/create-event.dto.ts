import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  date!: string;

  @IsNotEmpty()
  location!: string;

  @IsNotEmpty()
  category!: string;

  description?: string;
}
