import { IQuotes } from '../../data/interfaces/api/quotes/quotes.interface';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { DataQuotes } from '../../data/quotes/quotes';
import { IConstulQuote } from '../../data/interfaces/core/appointment manager/appointment manager.interface';

@Injectable()
export class AppointmentManagerService implements OnModuleInit {
  private quotes = new Map<string, Array<IQuotes>>();
  private startTime = '9:00';
  private endTime = '17:00';
  private timeAvailable = 0;
  private quotesAvailable: Array<IQuotes> = [];

  onModuleInit() {
    DataQuotes.forEach((quote) => {
      if (!this.quotes.has(quote.Day)) this.quotes.set(quote.Day, []);
      this.quotes.get(quote.Day).push(quote);
    });
  }

  aviablableQuotes(day: string): IConstulQuote {
    this.quotesAvailable = [];
    this.timeAvailable = 0;

    const quotesDay = this.quotes
      .get(day)
      .sort((a, b) => +a.Hour.split(':')[0] - +b.Hour.split(':')[0]);

    let startTime =
      +this.startTime.split(':')[0] * 60 + +this.startTime.split(':')[1];
    const endTime =
      +this.endTime.split(':')[0] * 60 + +this.endTime.split(':')[1];

    quotesDay.forEach((quote) => {
      const minutes =
        +quote.Hour.split(':')[0] * 60 + +quote.Hour.split(':')[1];

      if (minutes - startTime >= 30) {
        this.handlerQuotes(startTime, minutes, day);
      }

      startTime = minutes + +quote.Duration;
    });

    this.handlerQuotes(startTime, endTime, day);

    return {
      availableSpaces: this.quotesAvailable,
      scheduledAppoinments: quotesDay,
      timeAvailable: this.getTime(),
    };
  }

  getTime(time?: number): string {
    const timeInit = time ?? this.timeAvailable;
    const hourStart = timeInit / 60;
    const timeSplit = hourStart.toString().split('.');
    const hourInit =
      timeSplit[0].length === 1 ? `0${timeSplit[0]}` : timeSplit[0];
    const minuteInit = timeSplit[1]
      ? Math.round(+`0.${timeSplit[1]}` * 60)
      : '00';
    return `${hourInit}:${minuteInit}`;
  }

  handlerQuotes(startTime: number, minutes: number, day: string) {
    const Duration = `${minutes - startTime}`;

    const quoteAvailable: IQuotes = {
      Hour: this.getTime(startTime),
      Day: day,
      Duration,
    };

    this.quotesAvailable.push(quoteAvailable);
    this.timeAvailable = this.timeAvailable + +Duration;
  }

  createQuotes(quote: IQuotes): IConstulQuote {
    const quotesDay = this.quotes.get(quote.Day);

    const endTime =
      +this.endTime.split(':')[0] * 60 + +this.endTime.split(':')[1];

    const startTime =
      +quote.Hour.split(':')[0] * 60 + +quote.Hour.split(':')[1];

    if (startTime + +quote.Duration > endTime)
      throw new BadRequestException(
        'La cita no puede superar la hora final de atencion',
      );

    if (!quotesDay) throw new BadRequestException('Day invalid.');
    quotesDay.push({ ...quote });
    this.quotes.set(quote.Day, quotesDay);

    return this.aviablableQuotes(quote.Day);
  }

  deleteQuotes(quoteHour: string, day: string): IConstulQuote {
    const quotesDay = this.quotes
      .get(day)
      .filter(({ Hour }) => Hour !== quoteHour);

    this.quotes.set(day, quotesDay);

    return this.aviablableQuotes(day);
  }
}
