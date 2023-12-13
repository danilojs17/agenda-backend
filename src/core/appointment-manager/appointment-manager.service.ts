import { IQuotes } from '../../data/interfaces/api/quotes/quotes.interface';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataQuotes } from '../../data/quotes/quotes';

@Injectable()
export class AppointmentManagerService implements OnModuleInit {
  private quotes: Array<IQuotes> = [];
  private startTime = '9:00';
  private endTime = '17:00';
  private quotesAvailable: Array<IQuotes> = [];

  onModuleInit() {
    DataQuotes.forEach((quote) => {
      this.quotes.push(quote);
    });
  }

  aviablableQuotes(day: string) {
    const quotesDay = this.quotes
      .filter((quote) => quote.Day === day)
      .sort((a, b) => +a.Hour.split(':')[0] - +b.Hour.split(':')[0]);

    let startTime =
      +this.startTime.split(':')[0] * 60 + +this.startTime.split(':')[1];
    const endTime =
      +this.endTime.split(':')[0] * 60 + +this.endTime.split(':')[1];

    quotesDay.forEach((quote) => {
      const minutes =
        +quote.Hour.split(':')[0] * 60 + +quote.Hour.split(':')[1];

      if (minutes - startTime >= 30)
        this.handlerQuotes(startTime, minutes, day);

      startTime = minutes + +quote.Duration;
    });

    this.handlerQuotes(startTime, endTime, day);

    return this.quotesAvailable;
  }

  handlerQuotes(startTime: number, minutes: number, day: string) {
    const hourStart = startTime / 60;
    const hourInit = hourStart.toString().split('.');
    const minuteInit = +`0.${hourInit[1]}` * 60 ?? '00';
    const Duration = `${minutes - startTime}`;

    const quoteAvailable: IQuotes = {
      Hour: `${hourInit[0]}:${minuteInit}`,
      Day: day,
      Duration,
    };

    if (+Duration > 60) {
      const durationSplit = Math.trunc(+Duration / 30);

      let timeStart = startTime;

      for (let i = 0; i < durationSplit; i++) {
        const hourStart = timeStart / 60;
        const hourInit = hourStart.toString().split('.');
        const minuteInit = hourInit[1] ? +`0.${hourInit[1]}` * 60 : '00';
        const quoteAvailable: IQuotes = {
          Hour: `${hourInit[0]}:${minuteInit}`,
          Day: day,
          Duration: `30`,
        };
        this.quotesAvailable.push(quoteAvailable);
        timeStart = timeStart + 30;
      }
    } else {
      this.quotesAvailable.push(quoteAvailable);
    }
  }
}
