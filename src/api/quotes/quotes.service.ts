import { Injectable } from '@nestjs/common';
import { ICreateQuotes } from '../../data/interfaces/api/quotes/quotes.interface';
import { AppointmentManagerService } from './../../core/appointment-manager/appointment-manager.service';
import { IConstulQuote } from '../../data/interfaces/core/appointment manager/appointment manager.interface';

@Injectable()
export class QuotesService {
  constructor(
    private readonly appointmentManagerService: AppointmentManagerService,
  ) {}

  create(createQuoteData: ICreateQuotes): IConstulQuote {
    return this.appointmentManagerService.createQuotes(createQuoteData);
  }

  findAvialable(day: string): IConstulQuote {
    return this.appointmentManagerService.aviablableQuotes(day);
  }

  remove(quoteHour: string, day: string): IConstulQuote {
    const rest = this.appointmentManagerService.deleteQuotes(quoteHour, day);
    return rest;
  }
}
