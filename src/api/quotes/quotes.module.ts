import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { AppointmentManagerModule } from 'src/core/appointment-manager/appointment-manager.module';

@Module({
  imports: [AppointmentManagerModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
