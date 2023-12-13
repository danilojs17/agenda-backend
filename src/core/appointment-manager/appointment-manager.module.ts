import { Module } from '@nestjs/common';
import { AppointmentManagerService } from './appointment-manager.service';

@Module({
  providers: [AppointmentManagerService],
  exports: [AppointmentManagerService],
})
export class AppointmentManagerModule {}
