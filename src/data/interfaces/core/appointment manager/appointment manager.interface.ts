import { IQuotes } from '../../../interfaces/api/quotes/quotes.interface';

export interface IConstulQuote {
  scheduledAppoinments: Array<IQuotes>;
  availableSpaces: Array<IQuotes>;
  timeAvailable: string;
}
