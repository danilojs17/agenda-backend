import { AppointmentManagerService } from './../../core/appointment-manager/appointment-manager.service';
import { Injectable } from '@nestjs/common';
import {
  IQuotes,
  ICreateQuotes,
} from '../../data/interfaces/api/quotes/quotes.interface';
import { DataQuotes } from '../../data/quotes/quotes';

@Injectable()
export class QuotesService {
  constructor(
    private readonly appointmentManagerService: AppointmentManagerService,
  ) {}

  create(createQuoteData: ICreateQuotes): IQuotes {
    const quote = DataQuotes.push(createQuoteData);

    if (quote === DataQuotes.length)
      throw new Error(
        'Hubo un error al crear una cita, por favor intente nuevamente.',
      );
    return DataQuotes[quote];
  }

  findAll(): Array<IQuotes> {
    return DataQuotes;
  }

  findAvialable(day: string): Array<IQuotes> {
    return this.appointmentManagerService.aviablableQuotes(day);
  }

  remove(id: number) {
    const size = DataQuotes.length;
    DataQuotes.slice(id, 1);

    if (size === DataQuotes.length)
      throw new Error('No se puedo eliminar la cita');

    return id;
  }
}
