import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AppointmentManagerModule } from './core/appointment-manager/appointment-manager.module';

const envFilePath: string = `${__dirname}/common/env/development.env`;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    ApiModule,
    MorganModule,
    AppointmentManagerModule,
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class AppModule {}
