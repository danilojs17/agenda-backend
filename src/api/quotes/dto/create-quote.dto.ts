import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  Day: string;

  @IsString()
  @IsNotEmpty()
  Duration: string;

  @IsNotEmpty()
  @IsString()
  Hour: string;
}
