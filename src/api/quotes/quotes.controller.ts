import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { IConstulQuote } from '../../data/interfaces/core/appointment manager/appointment manager.interface';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto): IConstulQuote {
    return this.quotesService.create(createQuoteDto);
  }

  @Get(':day')
  findAvialable(@Param('day') day: string): IConstulQuote {
    return this.quotesService.findAvialable(day);
  }

  @Delete(':day/:id')
  remove(@Param('id') id: string, @Param('day') day: string): IConstulQuote {
    return this.quotesService.remove(id, day);
  }
}
